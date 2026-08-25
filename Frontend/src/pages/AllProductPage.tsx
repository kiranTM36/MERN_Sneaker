import Card from "../components/Card"
import FilterProduct from "./FilterProduct"

const AllProductPage = () => {
  return (
    <div>
        All PRoduct
        <FilterProduct name="All Product">
            <Card />
        </FilterProduct>
    </div>
    
  )
}

export default AllProductPage