import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null, // State for the currently logged-in user
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload; // Set the current user
    },
    clearCurrentUser(state) {
      state.currentUser = null; // Clear the current user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.users = action.payload;

        // Identify and set the currently logged-in user
        const auth = getAuth(); // Get Firebase Auth instance
        const user = auth.currentUser; // Get the current user

        if (user) {
          const loggedInUser = action.payload.find((u) => u.email === user.email);
          state.currentUser = loggedInUser || null; // Set currentUser if found
        }
      });
  },
});

// Selectors
export const selectAllUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
