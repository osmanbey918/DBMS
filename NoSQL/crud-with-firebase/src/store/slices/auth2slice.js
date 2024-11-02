import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";




const currentuser = createAsyncThunk(
    "auth/currentUser",
    async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                return user;
            }
        }
        catch {
            console.error();

        }
    }

)
const signup = createAsyncThunk(
    'auth/signup',
    async (user) => {
        try {
            const userref = await createUserWithEmailAndPassword(auth, user.email, user.password);
            let usertodb = {
                uname: user.name,
                email: user.email,
                address: user.address,
                uid: userref.user.id
            }
            await setDoc(doc(db, "users", userref.user.id), usertodb);
            return datatodb
        } catch { error }
    }
)

const loginuser= createAsyncThunk(
    "auth/loginuser",
    async(user)=>{
        const userref =  await signInWithEmailAndPassword(auth, user.email,user.password);
        const userdb = await getDoc(doc(db, "users", userref.user.id))
        const useraccepted = userdb.data();
        return useraccepted
    }
)

const userslice = createSlice({
    name: "users",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(currentuser.fullfilled, (state, action) => { state.user = action.payload })

    }
})