import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Product } from '../../shared/types'
import type { RootState, AppDispatch } from '../../app/store'
import { addToCart } from '../../entities/cart/cartSliсe'
import styles from './ProductCard.module.css'
import { toast } from 'react-toastify'

interface ProductCardProps {
    product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>()

    const cartItem = useSelector((state: RootState) =>
        state.cart.items.find(i => i.id === product.id)
    )

    const quantityInCart = cartItem?.quantity ?? 0
    const stockLeft = product.rating.count - quantityInCart

    const indicator =
        stockLeft <= 0
            ? styles.out
            : stockLeft <= 5
                ? styles.low
                : styles.in


    const handleAdd = () => {
        dispatch(addToCart(product))
        toast.success('Product added to cart')
    }
    return (
        <div className={styles.card}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>${product.price}</p>

            <span className={`${styles.stock} ${indicator}`}>
                {stockLeft <= 0
                    ? 'Out of stock'
                    : stockLeft <= 5
                        ? 'Low stock'
                        : 'In stock'}
            </span>

            <button
                disabled={stockLeft <= 0}
                onClick={() => handleAdd()}
            >
                Add to cart
            </button>
        </div>
    )
}

export default ProductCard