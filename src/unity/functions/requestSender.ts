import axios from 'axios';

const manageRequests = async (concurrencyLimit: number, totalRequests: number, onResponse: { (index: number): void; (arg0: any): void; }) => {
    let activeRequests = new Set();
    let currentIndex = 1;
    let requestsThisSecond = 0;
    const requestLimitPerSecond = Math.min(50, concurrencyLimit);

    const executeRequest = async (index: number) => {
        try {
            const response = await axios.get(`http://localhost:3001/api?index=${index}`);
            console.log(`Request ${index} completed with response: `, response.data);
            onResponse(index);
        } catch (error) {
            console.error(`Error in request ${index}: `, error);
        }
    };


    const manageRateLimit = async () => {
        if (requestsThisSecond >= requestLimitPerSecond) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            requestsThisSecond = 0;
        }
    };

    while (currentIndex <= totalRequests) {
        await manageRateLimit();

        while (activeRequests.size < concurrencyLimit && currentIndex <= totalRequests && requestsThisSecond < requestLimitPerSecond) {
            const indexCapture = currentIndex;
            requestsThisSecond++;

            const wrapper = async () => {
                await executeRequest(indexCapture);
                activeRequests.delete(wrapperPromise);
            };
            const wrapperPromise = wrapper();
            activeRequests.add(wrapperPromise);

            currentIndex++;
        }

        if (activeRequests.size >= concurrencyLimit || requestsThisSecond >= requestLimitPerSecond) {
            await Promise.race(activeRequests);
        }
    }

    await Promise.all(activeRequests);
};


export { manageRequests };
