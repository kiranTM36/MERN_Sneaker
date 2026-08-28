import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import { getSingleProduct } from '../store/productSlice'

const SingleProduct = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()

    const { product } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(id))
        }
    }, [dispatch, id])

    return (
        <div className='min-h-screen w-screen flex justify-center items-center bg-gray-50 p-4'>
            {product && (
                <div className='relative flex flex-col md:flex-row h-auto md:h-[80vh] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white p-4 gap-6'>
                    
                    {/* Image & Category Tag */}
                    <div className='relative h-64 md:h-full w-full md:w-1/2'>
                        <img 
                            src={`http://localhost:7700/uploads/${product.image}`} 
                            alt={product.productName} 
                            className='h-full w-full object-cover rounded-2xl' 
                        />
                        {/* Access categoryName safely */}
                        <div className='absolute z-10 top-4 left-4 bg-white/90 text-black font-semibold rounded-md px-3 py-1 shadow-md'>
                            {typeof product.categoryId === 'object' ? product.categoryId.categoryName : ''}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='flex flex-col justify-between w-full md:w-1/2 p-2'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product.productName}</h1>
                            <p className='text-2xl font-semibold text-emerald-600 mb-4'>${product.price}</p>
                            <p className='text-gray-600 leading-relaxed'>{product.description}</p>
                        </div>
                        
                        <div className='mt-6 border-t pt-4 flex items-center justify-between'>
                            <span className='text-sm text-gray-500'>Stock: <strong className='text-gray-800'>{product.quantity}</strong></span>
                            <button className='bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors'>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default SingleProduct