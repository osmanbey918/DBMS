import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
    name: 'feed',
    initialState: {value:0},
    reducers: {
        increment:(state) => {
            state.value += 1
        }
    }
})

export const {increment} = feedslice.actions;
export default feedslice.reducer;