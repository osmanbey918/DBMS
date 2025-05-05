import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const storage = getStorage();

export const fetchFeedData = createAsyncThunk(
  'feed/fetchFeedData',
  async (_, { rejectWithValue }) => {
    console.log('Fetching feed data...');
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

export const fetchUserName = createAsyncThunk(
  'user/fetchUserName',
  async (_, { rejectWithValue }) => {
    try {
      const userName = await getDocs(collection(db, 'users'));
      return userName.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFeedData = createAsyncThunk(
  'feed/deleteFeedData',
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'feeds', id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

export const addComment = createAsyncThunk(
  'feed/addComment',
  async ({ feedId, comment }, { rejectWithValue }) => {
    try {
      const feedRef = doc(db, 'feeds', feedId);
      const commentWithTimestamp = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      await updateDoc(feedRef, {
        comments: arrayUnion(commentWithTimestamp)
      });
      
      return { feedId, comment: commentWithTimestamp };
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
    users: [],
    imageUrl: null,
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // Handling addFeedData
      .addCase(addFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
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
        state.error = null;
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
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling deleteFeedData
      .addCase(deleteFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = state.feeds.filter(feed => feed.id !== action.payload);
      })
      .addCase(deleteFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling fetchUserName
      .addCase(fetchUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling addComment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const feed = state.feeds.find(f => f.id === action.payload.feedId);
        if (feed) {
          feed.comments = feed.comments || [];
          feed.comments.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increment } = feedSlice.actions;
export default feedSlice.reducer;
