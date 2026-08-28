import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "../statuses/STATUSES";
import axios from "axios";

interface Category {
  _id: string;
  categoryName: string;
}

interface product {
    _id : string,
    productName : string,
    price : number,
    description : string,
    image : string
    quantity : number
    categoryId: Category | string;
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
            const response = await axios.get("http://localhost:7700/product/all/products")
            dispatch(setProducts(response.data.products))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function getSingleProduct(id : string){
    return async function getSingleProductThunk(dispatch : any) {
        
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`http://localhost:7700/product/${id}`)
            dispatch(setSingleProduct(response.data.product))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}