import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import FilterProduct from './FilterProduct'
import type { AppDispatch, RootState } from '../store/store'
import { getProducts } from '../store/productSlice'
import { Link } from 'react-router-dom'

const FemaleSection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, status } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">All Section</h1>
      <FilterProduct name="Female">
        {
          products.map((product) => (
            <Link  key={product._id} to={`/product/${product._id}`}>
              <Card product={product} />
            </Link>
          ))
        }
      </FilterProduct>
    </div>
  )
}

export default FemaleSection