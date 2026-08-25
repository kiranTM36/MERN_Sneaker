import Card from '../components/Card'
import FilterProduct from './FilterProduct'
import ProductPage from './ProductPage'

const KidPage = () => {
  return (

    <div>
        <h1>Kids Shoes</h1>
        <FilterProduct name="Kids" >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </FilterProduct>
    </div>
  )
}

export default KidPage