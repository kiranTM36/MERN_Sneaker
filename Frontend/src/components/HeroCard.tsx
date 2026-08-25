import HeroImg from './../image/HeroCard.avif'

const HeroCard = () => {
  return (
    <div className='h-[55vh] w-[45vh] bg-white rounded-2xl flex flex-col justify-center items-center gap-5'>
        <div className="h-6/10 w-[95%] rounded-xl bg-center bg-cover" style={{ backgroundImage : `url(${HeroImg})`}}></div>
        <div className="h-3/10 w-[95%]  rounded-xl">

            <p>Blade Runner</p>
            <p>Rs 9999</p>
            <p>Rs <span className='line-through'>15999</span></p>
            <button className='p-2 bg-blue-500 rounded-md text-white'>Add to Cart</button>
        </div>
    </div>
  )
}

export default HeroCard