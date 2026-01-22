import axios from 'axios'
import type { Product } from '../shared/types'

const api = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await api.get('/products')
    return res.data
}