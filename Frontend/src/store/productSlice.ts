import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../statuses/STATUSES";
import axios from "axios";

interface product {
    _id : string,
    name : string,
    price : number,
    description : string,
    image : string
}

interface productState {
    products : product[],
    product : product | null,
    status : string
}

const initialState : productState = {
    products : [],
    product : null,
    status : ""
}

const productSlice = createSlice({
    name : 'product',
    initialState ,
    reducers : {
        setProducts(state , action : PayloadAction <product[]>){
            state.products = action.payload
        },
        setSingleProduct(state , action : PayloadAction <product>){
            state.product = action.payload
        },
        setStatus(state , action : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const { setProducts , setStatus, setSingleProduct } = productSlice.actions
export default productSlice.reducer

export function getProducts(){
    return async function getProductsThunk(dispatch : any) {
        
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get("")
            dispatch(setProducts(response.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function getSingleProduct(){
    return async function getSingleProductThunk(dispatch : any) {
        
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get("")
            dispatch(setSingleProduct(response.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}