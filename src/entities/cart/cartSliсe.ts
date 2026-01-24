import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../shared/types'

interface CartState {
  items: CartItem[]
}

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch { }
}

const initialState: CartState = {
  items: loadCart(),
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
      saveCart(state.items)
    },

    changeQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity
      }
      saveCart(state.items)
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
      saveCart(state.items)
    },
  },
})

export const { addToCart, changeQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer