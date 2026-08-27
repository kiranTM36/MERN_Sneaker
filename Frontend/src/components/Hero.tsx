import HeroImg from '../image/Shoe.avif'
import HeroCard from './HeroCard'

const Hero = () => {

  return (
    <div className="bg-black h-[85vh] w-full rounded-3xl bg-cover" style={{backgroundImage : `url(${HeroImg})`}}>
        <div className='absolute top-[20vh] left-[10vh]'>
            <h1 className='font-bold text-6xl max-w-125'>WALKING WITH PURPOSE.</h1>
            <p className='font-medium text-xl mt-7'>Premium Vegan Sneakers</p>
        </div>

        <div className='absolute top-[30vh] right-[20vh] z-3'>
            <HeroCard />
        </div>
    </div>
  )
}

export default Hero