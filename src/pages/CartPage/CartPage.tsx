import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store'
import { removeFromCart, changeQuantity } from '../../entities/cart/cartSliсe'
import styles from './CartPage.module.css'

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  if (!items.length) {
    return (
      <p className={styles.empty}>Cart empty</p>
    )
  }

  return (
    <div className={styles.page}>
      {items.map(item => (
        
        <div key={item.id} className={styles.item}>
        
          
          <span>{item.title}</span>

          <div className={styles.controls}>
            <button
              onClick={() =>
                dispatch(
                  changeQuantity({
                    id: item.id,
                    quantity: item.quantity - 1
                  })
                )
              }
              disabled={item.quantity === 1}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                dispatch(
                  changeQuantity({
                    id: item.id,
                    quantity: item.quantity + 1
                  })
                )
              }
            >
              +
            </button>

            <button
              className={styles.remove}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              remove
            </button>
          </div>
        </div>
      ))}

      <div className={styles.total}>
        Total <strong>{totalPrice.toFixed(2)} $</strong>
      </div>
    </div>
  )
}

export default CartPage