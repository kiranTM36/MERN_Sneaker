import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../statuses/STATUSES'
import axios from 'axios'

interface user {
    username : string | null,
    email : string,
    password : string
}

interface userState {
    user : user | null,
    token : string,
    status : string
}

const initialState : userState = {
    user : null,
    token : '',
    status : ''
}

const authSlice = createSlice({
    name : "auth",
    initialState ,
    reducers : {
        setUser(state ,action : PayloadAction<user>){
            state.user = action.payload
        },
        setToken(state ,action : PayloadAction<string>){
            state.token = action.payload
        },
        setStatus(state ,action : PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setStatus, setToken , setUser } = authSlice.actions
export default authSlice.reducer

export function register(data : user){
    return async function registerThunk(dispatch : any) {
        
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post("",data)
            
            if(response.status === 201 || response.status === 200){
                 dispatch(setUser(data))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function login(data : user){
    return async function loginThunk(dispatch : any) {
        
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post("http://localhost:7700/user/login",data)
            
            if(response.status === 201 || response.status === 200){
                dispatch(setUser(data))
                dispatch(setToken(response.data.token))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}