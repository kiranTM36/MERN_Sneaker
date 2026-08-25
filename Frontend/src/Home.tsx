import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='px-10'>
        <Navbar />
        <div className='mt-[12vh] mb-[5vh]'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Home