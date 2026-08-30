import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  _id: string
  productName: string
  price: number
  description: string
  image: string
}

export interface CartItem extends Product {
  cartQuantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      )

      if (existingItem) {
        existingItem.cartQuantity += 1
      } else {
        state.items.push({
          ...action.payload,
          cartQuantity: 1,
        })
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload)
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item._id === action.payload)
      if (item) {
        item.cartQuantity += 1
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item._id === action.payload)
      if (item) {
        if (item.cartQuantity > 1) {
          item.cartQuantity -= 1
        } else {
          state.items = state.items.filter((i) => i._id !== action.payload)
        }
      }
    },

    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer