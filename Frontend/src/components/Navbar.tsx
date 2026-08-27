import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10">
        <div className='flex justify-between w-full items-center h-[10vh] px-12 bg-white'>
            <Link to="/"><h1 className='text-4xl font-bold'>Shopping</h1></Link>

            <div className='flex gap-6'>
                <Link to='/' className=''>Home</Link>
                <Link to='/product'>Product</Link>
                <Link to=''>Home</Link>
                <Link to=''>Home</Link>
                <Link to=''>Home</Link>
                <Link to=''>Home</Link>
            </div>

            <div className='border flex px-2 py-1 rounded-md' >
                <input className='outline-none w-full' type="text" placeholder='Search...' />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <div className=' flex gap-2 items-center'>
                <i className="fa-solid fa-cart-shopping mr-[5vh] text-2xl"></i>
                <Link to='/signup'><button className='border py-1.5 px-2 rounded-md bg-black text-white hover:bg-white hover:text-black transition duration-200'>Sign Up</button></Link>
                <Link to='/login'><button className='border py-1.5 px-2 rounded-md hover:bg-black hover:text-white transition duration-200'>Login</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar