import { describe, it, expect } from 'vitest'
import cartReducer, { addToCart, removeFromCart } from './cartSliсe'
import type { Product } from '../../shared/types'

const mockProduct: Product = {
  id: 1,
  title: 'Test product',
  price: 100,
  description: '',
  category: '',
  image: '',
  rating: { rate: 4, count: 10 },
}

describe('cartSlice', () => {
  it('should add product to cart', () => {
    const state = cartReducer(undefined, addToCart(mockProduct))

    expect(state.items.length).toBe(1)
    expect(state.items[0].quantity).toBe(1)
  })

  it('should remove product from cart', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
    }

    const state = cartReducer(initialState as any, removeFromCart(1))
    expect(state.items.length).toBe(0)
  })
})