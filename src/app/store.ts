import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../entities/cart/cartSlise'

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})