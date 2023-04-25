import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store'

interface UserState {
    username:string;
    isUserLogin:boolean;
}

const initialState:UserState={
    username:'',
    isUserLogin:false,
}

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
            console.log("updated state:",state)
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
    }
})

export const { login, logout,setUsername } = userSlice.actions
export default userSlice.reducer