import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResponsesState {
    indexes: number[];
}

const initialState: ResponsesState = {
    indexes: [],
};

export const responsesSlice = createSlice({
    name: 'responses',
    initialState,
    reducers: {
        addResponse: (state, action: PayloadAction<number>) => {
            state.indexes.push(action.payload);
        },
    },
});

export const { addResponse } = responsesSlice.actions;

export default responsesSlice.reducer;
