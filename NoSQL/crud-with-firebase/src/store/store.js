// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';

const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});

export default store;
