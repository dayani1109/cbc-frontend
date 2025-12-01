import { useState } from "react";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header className="w-full bg-accent h-[100px] text-white px-[10px]">
      <div className="w-full h-full flex  relative ">
        <img
          src="logo.png"
          className="hidden lg:flex h-full absolute w-[110px] left-0 object-cover"
        />
        <div className="lg:hidden w-full flex justify-center items-center relative ">
          <MdMenu
            className="absolute left-2 text-3xl"
            onClick={() => setIsSideBarOpen(true)}
          />
          <img src="logo.png" className="h-full w-[110px] object-cover" />
        </div>

        {isSideBarOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] z-[50] ">
            <div className="w-[300px] bg-primary h-full">
              <div className="lg:hidden h-[100px] w-full flex justify-center items-center relative bg-accent ">
                <MdMenu
                  className="absolute left-2 text-3xl"
                  onClick={() => setIsSideBarOpen(true)}
                />
                <img src="logo.png" className="h-full w-[110px] object-cover" />
              </div>
            </div>
          </div>
        )}

        <div className="hidden h-full lg:flex justify-center items-center w-full gap-[40px] text-lg">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/order">Order</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link
          to="/cart"
          className="hidden h-full absolute right-0 lg:flex justify-center items-center text-3xl mr-10"
        >
          <MdOutlineShoppingCart />
        </Link>
      </div>
    </header>
  );
}
