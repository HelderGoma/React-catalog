import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { useEffect, useState } from 'react'
import styles from './Header.module.css'
const Header = () => {
    const totalCount = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    )

    const [isDark, setIsDark] = useState(false)


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setIsDark(savedTheme === 'dark')
            document.documentElement.dataset.theme = savedTheme
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark'
        setIsDark(!isDark)
        document.documentElement.dataset.theme = newTheme
        localStorage.setItem('theme', newTheme)
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Shop</div>

            <nav className={styles.nav}>
                <Link to="/">Catalog</Link>

                <Link to="/cart" className={styles.cart}>
                    Cart
                    {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
                </Link>

                <button
                    className={`${styles.themeSwitch} ${isDark ? styles.dark : ""}`}
                    onClick={toggleTheme}
                >
                    <div className={styles.switchCircle}>
                        {isDark ? "🌙" : "☀️"}
                    </div>
                </button>
            </nav>
        </header>
    )
}

export default Header