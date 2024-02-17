import { configureStore } from '@reduxjs/toolkit';
import responsesReducer from './slice/responsesSlice';
// import { apiSlice } from './api/api';

const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        responses: responsesReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
