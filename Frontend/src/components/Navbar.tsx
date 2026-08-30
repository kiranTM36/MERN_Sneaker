import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import Cart from '../pages/Cart'

const Navbar = () => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')


  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  )
  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Logged out successfully')
    navigate('/login')
  }

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between w-full items-center h-[10vh] px-12 bg-white">
        <Link to="/">
          <h1 className="text-4xl font-bold">Shopping</h1>
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
        </div>

        <div className="border flex px-2 py-1 rounded-md">
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Search..."
          />
          <button type="button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative cursor-pointer mr-4" onClick={() => setShowCart(true)}>
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </div>

          {token ? (
            <button
              onClick={handleLogout}
              className="border py-1.5 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="border py-1.5 px-3 rounded-md bg-black text-white hover:bg-white hover:text-black transition duration-200">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="border py-1.5 px-3 rounded-md hover:bg-black hover:text-white transition duration-200">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {showCart && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="relative max-h-[90vh] overflow-y-auto rounded-lg">
              <button
                onClick={() => setShowCart(false)}
                className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-400 text-black rounded-full h-8 w-8 flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <Cart />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar