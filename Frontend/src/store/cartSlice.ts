import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface  product {
    _id : string,
    productName : string,
    price : number,
    description : string,
    image : string
}

interface cartItem extends product {
    cartQuantity : number
}

interface cartState {
    items : cartItem[],
    status : string
}

const initialState : cartState = {
    items : [],
    status : ''
}

const cartSlice = createSlice({
    name : 'cart',
    initialState , 
    reducers : {
        addToCart(state , action : PayloadAction<product>){
            const existingItem = state.items.find((item) => item._id === action.payload._id )

            if(existingItem){
                existingItem.cartQuantity += 1
            }else{
                state.items.push({
                    ...action.payload,
                    cartQuantity : 1
                })
            }
        },

        removeFromCart(state , action : PayloadAction<string>){
            state.items =  state.items.filter((item) => item._id !== action.payload)
        },

        increaseQuantity(state, action : PayloadAction<string>){
            const item = state.items.find((item) =>  item._id === action.payload)

            if(item){
                item.cartQuantity += 1
            }
        },
        decreaseQuantity(state, action : PayloadAction<string>){
            const item = state.items.find((item) =>  item._id === action.payload)

            if(item && item.cartQuantity > 1){
                item.cartQuantity -= 1
            }
        }
    }
})

export const {addToCart , removeFromCart , increaseQuantity , decreaseQuantity} = cartSlice.actions
export default cartSlice.reducer