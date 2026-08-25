import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productSlice'
import authSlice from "./authSlice"
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer : {
        product : productSlice,
        auth : authSlice,
        cart : cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch