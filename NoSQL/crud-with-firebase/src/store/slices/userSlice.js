import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';


export const fetchUserName = createAsyncThunk(
  'user/fetchUserName',
  async (_, { rejectWithValue }) => {
    const userName = await getDocs(collection(db, 'users'),);
    return userName.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  }
)


const userSlice = createSlice({
  name: 'user',
  initialState: {
    users:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});


export const { increment } = userSlice.actions;
export default userSlice.reducer;
