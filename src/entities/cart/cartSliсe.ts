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
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    changeQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  }
})

export const { addToCart, changeQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer