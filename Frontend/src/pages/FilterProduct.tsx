import React, { Children } from 'react'

const FilterProduct = (props : {name : string, children:React.ReactNode}) => {
  return (
    <div>
        <div>FilterProduct</div>
        <div className='flex justify-center flex-wrap gap-5'>
            {props.children}
        </div>
    </div>
    // {
    //     Product.filter((item) => item.category === {props.name} )
    // }
  )
}

export default FilterProduct