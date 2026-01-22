import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../shared/types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]')
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity++
      else state.items.push({ ...action.payload, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer