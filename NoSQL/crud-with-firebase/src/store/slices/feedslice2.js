import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, getDoc } from "firebase/firestore";
 

export const addfeed = createAsyncThunk(
    "feed/addfeed",
    async (data, { rejectwithvalue }) => {
        const ref = await addDoc(collection(db, 'feeds'), data);
        return { id: docRef.id, ...data };
    }
)

export const fetch = createAsyncThunk(
    "feed/fetch",
    async(_, {rejectwithvalue}) =>{
        const fetcgdata = await getDoc(collection(db, feed))
        return
    }

)