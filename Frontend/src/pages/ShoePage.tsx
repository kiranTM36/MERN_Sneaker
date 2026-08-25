import Card from '../components/Card'

const ShoePage = () => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-medium  mb-[3vh]'>BEST SELLING SHOES</h1>
                <div className='text-xl font-light  mb-[3vh] flex items-center justify-center'>view all<i className="fa-solid fa-arrow-right"></i></div>
            </div>
            <div className='flex items-center justify-between'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default ShoePage