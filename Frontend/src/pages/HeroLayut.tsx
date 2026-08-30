
import KidHero from '../components/KidHero'
import Hero from '../components/Hero'
import MaleHome from './MaleHome.'
import ShoePage from './ShoePage'
import FemaleShoe from './FemaleShoe'

const HeroLayut = () => {
  return (
    <div className='flex justify-center gap-10 flex-col'>
            <Hero />
            <ShoePage />
            <KidHero />
            <FemaleShoe />
            <MaleHome />
    </div>
  )
}

export default HeroLayut