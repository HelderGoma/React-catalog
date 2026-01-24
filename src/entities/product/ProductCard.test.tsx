import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import ProductCard from './ProductCard'
import type { Product } from '../../shared/types'

const product: Product = {
    id: 1,
    title: 'Test product',
    price: 50,
    description: '',
    category: '',
    image: '',
    rating: { rate: 4, count: 10 },
}

test('renders product and add to cart button', () => {
    render(
        <Provider store={store}>
            <ProductCard product={product} />
        </Provider>
    )

    expect(screen.getByText('Test product')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument()
})