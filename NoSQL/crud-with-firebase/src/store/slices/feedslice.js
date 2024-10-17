// src/store/slices/feedSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig'; // Make sure to set up Firebase config
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Thunk to add data to Firestore
export const addFeedData = createAsyncThunk(
  'feed/addFeedData',
  async (data, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'feeds'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch data from Firestore
export const fetchFeedData = createAsyncThunk(
  'feed/fetchFeedData',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'feeds'));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    value: 0,
    feeds: [],
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFeedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds.push(action.payload);
      })
      .addCase(addFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      })
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increment } = feedSlice.actions;
export default feedSlice.reducer;
