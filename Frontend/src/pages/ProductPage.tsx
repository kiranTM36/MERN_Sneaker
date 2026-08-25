import { Link, Outlet } from "react-router-dom";

const ProductPage = () => {
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