import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'

interface UserState {
    username:string;
    password:string;
    isUserLogin:boolean;
}

const initialState:UserState={
    username:'',
    password:'',
    isUserLogin:false,
}

export const userLogin = createAsyncThunk(
    'user/login',async(data:UserState,thunkAPI)=>{
        try{
            const response = await fetch('https://dummyjson.com/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            })
            const responseData = await response.json();
            return responseData
        }catch(error){
            console.log("user login thunk error",error)
            throw error;
        }
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state)=>{
            console.log("login action called")
            console.log(state)
            return {
                ...state,
                username:state.username,
                isUserLogin:true
            };
        },
        logout:(state)=>{
            return {
                ...state,
                isUserLogin:false
            };
        },
        setUsername:(state,action:PayloadAction<{username:string}>)=>{
            return {
                ...state,
                username:action.payload.username
            };
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            console.log("inside builder")
            state.username = action.payload.username
            state.isUserLogin = true
        });
    }
})

export const { login, logout,setUsername } = userSlice.actions
export default userSlice.reducer