import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import { getSingleProduct } from '../store/productSlice'

const SingleProduct = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()

    const { product } = useSelector(
        (state: RootState) => state.product
    )

    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(id))
        }
    }, [dispatch, id])

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

            <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">

                {/* IMAGE */}
                <div className="h-[500px]">
                    <img
                        src={`http://localhost:7700/uploads/${product.image}`}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* DETAILS */}
                <div className="p-8 flex flex-col justify-center">

                    <p className="text-sm text-gray-400 uppercase mb-3">
                        {typeof product.categoryId === 'object'
                            ? product.categoryId.categoryName
                            : ''}
                    </p>

                    <h1 className="text-4xl font-semibold mb-4">
                        {product.productName}
                    </h1>

                    <p className="text-2xl font-medium mb-5">
                        ${product.price}
                    </p>

                    <p className="text-gray-500 leading-7 mb-6">
                        {product.description}
                    </p>

                    <p className="text-sm text-gray-500 mb-6">
                        Stock: <span className="text-black font-medium">
                            {product.quantity}
                        </span>
                    </p>

                    <div className="flex gap-3">

                        <button className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                            Add to Cart
                        </button>

                        <Link
                            to="/product"
                            className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Back
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SingleProduct