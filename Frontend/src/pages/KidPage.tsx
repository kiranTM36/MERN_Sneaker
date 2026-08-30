import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import type { AppDispatch, RootState } from '../store/store'
import FilterProduct from './FilterProduct'
import { useEffect } from 'react'
import { getProducts } from '../store/productSlice'
import { Link } from 'react-router-dom'

const KidPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { products, status } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const kidProducts = products.filter((item) => {
    if (typeof item.categoryId === 'object') {
      return item.categoryId.categoryName.toLowerCase() === 'kids'
    }

    return false
  })

  return (
    <div>
      <h1>Kids Shoes</h1>

      <FilterProduct name="Kids">
        {kidProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <Card product={product} />
          </Link>
        ))}
      </FilterProduct>
    </div>
  )
}

export default KidPage