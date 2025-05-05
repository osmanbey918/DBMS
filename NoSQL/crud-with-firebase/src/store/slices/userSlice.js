import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const fetchUserName = createAsyncThunk(
  'user/fetchUserName',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          return userDoc.data();
        }
      }
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
