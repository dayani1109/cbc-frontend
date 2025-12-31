import { useState } from "react";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import UserData from "./userData";
import UserDataMobile from "./userDataMobile";

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header className="w-full bg-accent h-[100px] text-white px-[10px] overflow-visible ">
      <div className="w-full h-full flex items-center  relative overflow-visible">
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
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] z-[100] text-accent">
            <div className="w-[300px] bg-primary h-full flex flex-col relative">
              <div className="lg:hidden h-[100px] w-full flex justify-center items-center relative bg-accent  ">
                <MdMenu
                  className="absolute left-2 text-3xl text-white"
                  onClick={() => setIsSideBarOpen(false)}
                />
                <img src="logo.png" className="h-full w-[110px] object-cover" />
              </div>
              <a
                href="/"
                className="p-4 border-b border-secondary/10 font-bold "
              >
                {" "}
                Home{" "}
              </a>
              <a
                href="/products"
                className="p-4 border-b border-secondary/10 font-bold"
              >
                {" "}
                Products{" "}
              </a>
              <a
                href="/order"
                className="p-4 border-b border-secondary/10 font-bold"
              >
                {" "}
                Order{" "}
              </a>
              <a
                href="/about"
                className="p-4 border-b border-secondary/10 font-bold"
              >
                {" "}
                About Us{" "}
              </a>
              <a
                href="/contact"
                className="p-4 border-b border-secondary/10 font-bold"
              >
                {" "}
                Contact{" "}
              </a>
              <a
                href="/cart"
                className="p-4 border-b border-secondary/10 font-bold"
              >
                {" "}
                Cart{" "}
              </a>
            </div>
            <div className="lg:hidden flex w-[200px] absolute bottom-[100px]  justify-end items-center gap-4 z-[9999]">
              <UserDataMobile />
            </div>
          </div>
        )}

        <div className="hidden lg:flex h-full justify-center items-center flex-1 gap-[40px] text-lg ml-75">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/order">Order</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="h-full hidden lg:flex w-[200px] ml-auto mr-[100px] justify-end items-center gap-4 relative">
          <UserData />
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
