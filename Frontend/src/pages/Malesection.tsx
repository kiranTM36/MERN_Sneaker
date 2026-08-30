import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import FilterProduct from './FilterProduct'
import type { AppDispatch, RootState } from '../store/store'
import { getProducts } from '../store/productSlice'
import { Link } from 'react-router-dom'

const Malesection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, status } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  // Filter products where categoryName matches "Female" (case-insensitive check)
  const maleProducts = products.filter((item) => {
    if (typeof item.categoryId === 'object') {
      return item.categoryId.categoryName.toLowerCase() === 'male'
    }
    return false
  })

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Male Section</h1>
      <FilterProduct name="Male">
        {status === 'loading' ? (
          <p>Loading products...</p>
        ) : maleProducts.length === 0 ? (
          <p>No Male products found.</p>
        ) : (
          maleProducts.map((product) => (
            <Link to={`/product/${product._id}`}>
                <Card key={product._id} product={product} />
            </Link>
          ))
        )}
      </FilterProduct>
    </div>
  )
}

export default Malesection