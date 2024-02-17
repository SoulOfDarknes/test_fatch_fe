import axios from 'axios';

const manageRequests = async (concurrencyLimit: number, totalRequests: number, onResponse: (index: number) => void) => {
    let activeRequests = new Set<Promise<void>>();
    let currentIndex = 1;

    const executeRequest = async (index: number) => {
        try {
            const response = await axios.get(`http://localhost:3001/api?index=${index}`);
            console.log(`Request ${index} completed: `, response.data);
            onResponse(index);
        } catch (error) {
            console.error(`Error in request ${index}: `, error);
        }
    };

    while (currentIndex <= totalRequests) {
        while (activeRequests.size < concurrencyLimit && currentIndex <= totalRequests) {
            const indexCapture = currentIndex;

            const wrapper = async () => {
                await executeRequest(indexCapture);
                activeRequests.delete(wrapperPromise);
            };
            const wrapperPromise = wrapper();
            activeRequests.add(wrapperPromise);
            currentIndex++;
        }

        if (activeRequests.size >= concurrencyLimit) {
            await Promise.race(activeRequests);
        }
    }

    await Promise.all(activeRequests);
};



export { manageRequests };
