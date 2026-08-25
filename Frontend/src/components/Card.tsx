import HeroImg from './../image/HeroCard.avif'

const Card = () => {
  return (
    <div className='h-[50vh] w-[22vw] bg-white rounded-2xl flex flex-col justify-center items-center gap-5'>
        <div className="h-6/10 w-[95%] relative rounded-xl bg-center bg-cover" style={{ backgroundImage : `url(${HeroImg})`}}>
            <span className='bg-white p-1 rounded-md absolute top-[1vh] left-[1vh]'>Shoes</span>
        </div>
        <div className="h-3/10 w-[95%]  rounded-xl">

            <p>Blade Runner</p>
            <p>Rs 9999</p>
            <p>Rs <span className='line-through'>15999</span></p>
            <button className='p-2 rounded-md text-white'>Add to Cart</button>
        </div>
    </div>
  )
}

export default Card