import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import type { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import { getProducts } from '../store/productSlice'
import { Link } from 'react-router-dom'

const FemaleShoe = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { products, status } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const maleProducts = products.filter((item) => {
    if (typeof item.categoryId === 'object') {
      return item.categoryId.categoryName.toLowerCase() === 'female'
    }
    return false
  })

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-medium  mb-[3vh]'>MLAE SHOES</h1>
                <div className='text-xl font-light  mb-[3vh] flex items-center justify-center'>view all<i className="fa-solid fa-arrow-right"></i></div>
            </div>
            <div className='flex items-center justify-between'>
                {
                    maleProducts.slice(0,4).map((product) => (
                        <Link to={`product/${product._id}`} key={product._id} >
                            <Card key={product._id} product={product} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default FemaleShoe