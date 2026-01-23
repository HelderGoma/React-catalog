import { useEffect, useState, useMemo } from 'react'
import type { Product } from '../../shared/types'
import { fetchProducts, fetchCategories } from '../../shared/api'
import ProductCard from '../../entities/product/ProductCard'
import ProductCardSkeleton from '../../entities/product/ProductCardSkeleton'
import styles from './CatalogPage.module.css'
import { debounce } from 'lodash'
import { useSearchParams } from 'react-router-dom'

const PRODUCTS_PER_PAGE = 12

const CatalogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialPage = Number(searchParams.get('page'))
    const [page, setPage] = useState<number>(initialPage)
    const [products, setProducts] = useState<Product[]>([])
    const [filtered, setFiltered] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('default')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([fetchProducts(), fetchCategories()])
            .then(([productsData, cats]) => {
                setProducts(productsData)
                setCategories(cats)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let data = [...products]

        if (category !== 'all') {
            data = data.filter(p => p.category === category)
        }

        if (search) {
            data = data.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (sort === 'price-asc') data.sort((a, b) => a.price - b.price)
        if (sort === 'price-desc') data.sort((a, b) => b.price - a.price)
        if (sort === 'title') data.sort((a, b) => a.title.localeCompare(b.title))

        setFiltered(data)
        setPage(1)
    }, [products, search, category, sort])

    const paginated = useMemo(
        () =>
            filtered.slice(
                (page - 1) * PRODUCTS_PER_PAGE,
                page * PRODUCTS_PER_PAGE
            ),
        [filtered, page]
    )

    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)

    const handleSearch = useMemo(
        () => debounce((value: string) => setSearch(value), 300),
        []
    )

    useEffect(() => {
        return () => {
            handleSearch.cancel()
        }
    }, [handleSearch])


    const handlePageChange = (p: number) => {
        setPage(p)
        searchParams.set('page', String(p))
        setSearchParams(searchParams)
    }

    return (
        <div className={styles.page}>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={e => handleSearch(e.target.value)}
                />

                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="all">All categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="default">Sort</option>
                    <option value="price-asc">Price Up</option>
                    <option value="price-desc">Price Down</option>
                    <option value="title">Title</option>
                </select>
            </div>

            {loading ? (
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : paginated.length === 0 ? (
                <p>Products not found</p>
            ) : (
                <div className={styles.grid}>
                    {paginated.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            className={p === page ? styles.activePage : ''}
                            onClick={() => handlePageChange(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CatalogPage