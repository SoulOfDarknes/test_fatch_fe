import axios from 'axios';

const sendRequest = async (index: number): Promise<void> => {
    console.log(`Sending request #${index}`);
    try {
        const response = await axios.get(`http://localhost:3001/api?index=${index}`);
        console.log(`Request ${index} completed: `, response.data);
    } catch (error) {
        console.error(`Error in request ${index}: `, error);
    }
};


const manageRequests = async (concurrencyLimit: number, totalRequests: number, onResponse: { (index: number): void; (arg0: number, arg1: void): any; }) => {
    let activeRequests: any[] = [];
    let requestsSent = 0;
    const startTime = Date.now();

    for (let index = 1; index <= totalRequests; index++) {
        if (activeRequests.length >= concurrencyLimit || requestsSent >= concurrencyLimit) {
            await Promise.race(activeRequests);
        }

        if (requestsSent >= concurrencyLimit) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1000) {
                await new Promise(resolve => setTimeout(resolve, 1000 - elapsedTime));
            }
            requestsSent = 0;
        }

        const requestPromise = sendRequest(index).then(response => onResponse(index, response));
        activeRequests.push(requestPromise);
        requestsSent++;

        activeRequests = activeRequests.filter(promise => !promise.isFulfilled);
    }
};

export { manageRequests };


// const manageRequests = async (concurrencyLimit: number, totalRequests: number, onResponse: (index: number) => void) => {
//     const activeRequests = new Set<Promise<void>>();
//     let currentIndex = 1;

//     const executeRequest = async (index: number) => {
//         await sendRequest(index);
//         onResponse(index);
//     };

//     while (currentIndex <= totalRequests) {
//         while (activeRequests.size < concurrencyLimit && currentIndex <= totalRequests) {
//             const indexCapture = currentIndex;
//             const requestPromise = executeRequest(indexCapture).then(() => {
//                 activeRequests.delete(requestPromise);
//             });

//             activeRequests.add(requestPromise);
//             currentIndex++;
//         }

//         if (activeRequests.size >= concurrencyLimit) {
//             await Promise.race(activeRequests);
//         }
//     }

// };
