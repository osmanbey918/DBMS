import { configureStore } from "@reduxjs/toolkit";
import feedslice from "./slices/feedslice"

export const store = configureStore({
    reducer:{
        feed: feedslice,
    }
});