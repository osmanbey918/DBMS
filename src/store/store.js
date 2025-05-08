// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    auth: authReducer,
    user: userReducer
  },
});

export default store;
