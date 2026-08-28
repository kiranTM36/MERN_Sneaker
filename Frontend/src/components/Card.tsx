import { useLocation } from 'react-router-dom'

interface Product {
    _id: string
    productName: string
    price: number
    description: string
    image: string
}

const Card = ({ product }: { product: Product }) => {

    const location = useLocation()

    const showButton = location.pathname !== '/'

    const handleAddtoCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    if (!product) return null;
    return (
        <div className="w-[22vw] bg-white rounded-2xl py-2 flex flex-col justify-center items-center gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-5">

            <div className="group h-[36vh] w-[97%] relative rounded-xl overflow-hidden">

                <img
                    src={`http://localhost:7700/uploads/${product.image}`}
                    alt={product.productName}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 "
                />
                <span className="bg-white p-1 rounded-md absolute top-[1vh] left-[1vh] z-10">
                    Shoes
                </span>

            </div>

            {/* Product Info */}
            <div className="h-[30%] w-[95%] rounded-xl">

                <p>{product.productName}</p>

                <p>Rs 9999</p>

                <p>
                    Rs <span className="line-through">{product.price}</span>
                </p>

                {
                    showButton && (
                        <button onClick={handleAddtoCart} className="p-2 mt-3 rounded-md text-white bg-black">
                            Add to Cart
                        </button>
                    )
                }

            </div>

        </div>
    )
}

export default Card