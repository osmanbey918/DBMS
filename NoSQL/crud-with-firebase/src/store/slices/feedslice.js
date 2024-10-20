// src/store/slices/feedSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const storage = getStorage();

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

// Thunk to upload image to Firebase Storage
export const uploadImage = createAsyncThunk(
  'feed/uploadImage',
  async (file, { rejectWithValue }) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
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
    imageUrl: null,
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
      // Handling addFeedData
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
      // Handling fetchFeedData
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
      })
      // Handling uploadImage
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.imageUrl = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increment } = feedSlice.actions;
export default feedSlice.reducer;
