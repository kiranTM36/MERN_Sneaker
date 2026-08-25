import { Link } from 'react-router-dom'
import KidShoe from '../image/Kids Sale.avif'

const KidHero = () => {
    return (
        <div className='h-[80vh] w-full flex justify-evenly items-center'>
            <div className="relative h-[90%] w-1/2 bg-white">

                <div className='absolute top-[17vh] left-[10vh]'>
                    <h1 className='font-bold text-6xl max-w-125'>KIDS COLLECTION 20% OFF SALE</h1>
                    <p className='font-medium text-xl mt-7'>Exclusive, one-time offer</p>
                </div>

                <Link to='product/kids' className='absolute top-[53vh] text-xl font-light  mb-[3vh] text-white rounded-sm left-[10vh] p-2 bg-blue-500 flex items-center justify-center'>view all<i className="fa-solid fa-arrow-right"></i></Link>

            </div>
            <div className="h-[90%] w-4/10 bg-white rounded-2xl bg-center" style={{ backgroundImage: `url(${KidShoe})` }}></div>
        </div>
    )
}

export default KidHero