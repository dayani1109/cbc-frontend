import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-accent h-[100px] text-white px-[10px]">
      <div className="w-full h-full flex relative">
        <img
          src="logo.png"
          className="h-full absolute w-[110px] left-0 object-cover"
        />
        <div className="h-full flex justify-center items-center w-full gap-[40px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/order">Order</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link to ="/cart" className="h-full absolute right-0 flex justify-center items-center text-3xl mr-10">
        <MdOutlineShoppingCart />
        </Link>
      </div>
    </header>
  );
}
