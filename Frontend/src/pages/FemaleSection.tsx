import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import FilterProduct from './FilterProduct'
import type { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import { getProducts } from '../store/productSlice'


const FemaleSection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {products , status} = useSelector((state:RootState) => state.product) 

  useEffect(()=> {
    dispatch(getProducts())
  }, [dispatch])

  console.log(status , products)
  return (

    <div>
        <h1>Female Section</h1>
        <FilterProduct name="Kids" >
            {
              products.map((product) => (
                <Card key={product._id} product={product}  />
              ))
            }
        </FilterProduct>
    </div>
  )
}

export default FemaleSection