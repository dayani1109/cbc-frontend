import { FaCaretDown, FaSortUp } from "react-icons/fa";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col pt-10 items-center">
      <div className="w-full max-w-[650px] flex flex-col gap-5 px-4">

        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full h-[140px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center p-4 relative"
          >
            {/* Delete Button */}
            <button
              className="absolute -right-12 top-4 text-red-500 bg-red-100 hover:bg-red-500 hover:text-white transition-all rounded-full p-2 shadow"
              onClick={() => {
                addToCart(item, -item.quantity);
                setCart(loadCart());
              }}
            >
              <FaRegTrashCan size={18} />
            </button>

            {/* Image */}
            <img
              className="h-full aspect-square object-cover rounded-lg shadow-sm"
              src={item.image}
            />

            {/* Product Name + ID */}
            <div className="flex flex-col ml-4 w-[200px]">
              <h1 className="font-semibold text-lg text-secondary leading-tight">
                {item.name}
              </h1>
              <span className="text-sm text-secondary opacity-60">{item.productID}</span>
            </div>

            {/* Quantity */}
            <div className="flex flex-col items-center w-[90px]">
              <FaSortUp
                className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(loadCart());
                }}
              />
              <span className="font-bold text-2xl text-secondary">{item.quantity}</span>
              <FaCaretDown
                className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(loadCart());
                }}
              />
            </div>

            {/* Price */}
            <div className="flex flex-col w-[150px] items-end">
              {item.labelledPrice > item.price && (
                <span className="text-secondary line-through text-lg opacity-60">
                  LKR {item.labelledPrice.toFixed(2)}
                </span>
              )}
              <span className="text-accent font-bold text-2xl">
                LKR {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* Total Section */}
        <div className="w-full h-[120px] bg-white rounded-xl shadow-md flex items-center justify-between px-6">
          <Link state={cart}
            to="/checkout"
            className="bg-accent text-white px-6 py-3 rounded-lg shadow hover:bg-accent/90 transition"
          >
            Proceed to Checkout
          </Link>

          <span className="font-bold text-2xl text-accent">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
}
