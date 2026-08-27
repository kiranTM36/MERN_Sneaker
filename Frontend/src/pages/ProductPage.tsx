import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { getProducts } from "../store/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {products , status} = useSelector((state : RootState) => state.product)

  useEffect(()=> {
    dispatch(getProducts())
  },[dispatch])

  console.log(status , products)
  return (
    <div className="h-[90vh] w-full flex justify-center items-center">

      <div className="bg-amber-50 h-full w-[20vw] flex flex-col p-5 gap-4">

        <Link to=".">All Products</Link>
        <Link to="kids">Kids</Link>
        <Link to="male">Male</Link>
        <Link to="female">Female</Link>

      </div>

      <div className="h-full w-[80vw] overflow-y-auto scrollbar-none">
        <Outlet />
      </div>

    </div>
  );
};

export default ProductPage;