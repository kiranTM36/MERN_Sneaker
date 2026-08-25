import ShoePage from './ShoePage'
import KidHero from '../components/KidHero'
import Hero from '../components/Hero'

const HeroLayut = () => {
  return (
    <div className='flex justify-center gap-10 flex-col'>
            <Hero />
            <ShoePage />
            <KidHero />
            <ShoePage />
            <ShoePage />
    </div>
  )
}

export default HeroLayut