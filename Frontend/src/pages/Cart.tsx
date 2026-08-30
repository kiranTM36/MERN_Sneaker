import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../store/cartSlice'
import axios from 'axios'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [loading, setLoading] = useState(false)

  // Dynamic calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  )
  const shipping = cartItems.length > 0 ? 8.0 : 0.0
  const total = subtotal + shipping

  // Handle checkout via Axios
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert('Cart is empty!')

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please log in to place an order.')
      return
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.productName,
        quantity: item.cartQuantity,
        price: item.price,
      })),
      shippingAddress: {
        address: 'Main Street 12',
        city: 'Kathmandu',
        phone: '9800000000',
      },
      totalPrice: total,
    }

    try {
      setLoading(true)
      const response = await axios.post('', orderData)

      if (response.status === 201 || response.status === 200) {
        alert('Order placed successfully!')
        dispatch(clearCart())
      }
    } catch (error: any) {
      console.error('Order error:', error)
      const message = error.response?.data?.message || 'Failed to place order'
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  {cartItems.length === 0 ? (
                    <li className="py-8 text-center text-gray-500 font-medium">
                      Your cart is empty.
                    </li>
                  ) : (
                    cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={`http://localhost:7700/uploads/${item.image}`}
                            alt={item.productName}
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.productName}
                              </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                ${(item.price * item.cartQuantity).toFixed(2)}
                              </p>

                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() =>
                                      dispatch(decreaseQuantity(item._id))
                                    }
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs font-semibold uppercase transition">
                                    {item.cartQuantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(increaseQuantity(item._id))
                                    }
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={() => dispatch(removeFromCart(item._id))}
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-red-600"
                            >
                              <svg
                                className="block h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {cartItems.length > 0 && (
                <>
                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${shipping.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">
                        USD{' '}
                      </span>
                      {total.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleCheckout}
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 disabled:bg-gray-400"
                    >
                      {loading ? 'Processing...' : 'Checkout'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart