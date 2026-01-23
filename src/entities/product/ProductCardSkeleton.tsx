import type { FC } from 'react'
import styles from './ProductCardSkeleton.module.css'

const ProductCardSkeleton: FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.image} />
            <div className={styles.title} />
            <div className={styles.description} />
            <div className={styles.bottom}>
                <div className={styles.priceBox} />
                <div className={styles.button} />
            </div>
        </div>
    )
}

export default ProductCardSkeleton