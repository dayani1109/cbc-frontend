import { FaCaretDown, FaSortUp } from "react-icons/fa";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col pt-6 items-center px-2 sm:px-4">
      <div className="w-[300px]lg:w-[680px] flex flex-col gap-5">
        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-center p-4 relative"
          >
            {/* Delete Button */}
            <button
              className="absolute right-5 lg:-right-12 top-3 text-red-500 bg-red-100 hover:bg-red-500 hover:text-white transition-all rounded-full p-2 shadow"
              onClick={() => {
                addToCart(item, -item.quantity);
                setCart(loadCart());
              }}
            >
              <FaRegTrashCan size={18} />
            </button>

            {/* Image */}
            <img
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain rounded-lg shadow-sm"
              src={item.image}
            />

            {/* Product Name + ID */}
            <div className="flex flex-col sm:ml-4 mt-3 sm:mt-0 w-full sm:w-[200px]">
              <h1 className="font-semibold text-lg text-secondary leading-tight">
                {item.name}
              </h1>
              <span className="text-sm text-secondary opacity-60">
                {item.productID}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex flex-row sm:flex-col items-center justify-center mt-3 sm:mt-0 w-full sm:w-[80px] gap-4 sm:gap-1">
              <FaSortUp
                className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(loadCart());
                }}
              />
              <span className="font-bold text-2xl text-secondary">
                {item.quantity}
              </span>
              <FaCaretDown
                className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(loadCart());
                }}
              />
            </div>

            {/* Price */}
            <div className="flex flex-col items-end mt-3 sm:mt-0 w-full sm:w-[120px] gap-2">
              {item.labelledPrice > item.price && (
                <span className="text-secondary line-through text-lg opacity-60">
                  LKR {item.labelledPrice.toFixed(2)}
                </span>
              )}

              <span className="text-accent font-bold text-xl">
                LKR {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* Total Section */}
        <div className="w-full bg-white rounded-xl shadow-md flex flex-col-reverse sm:flex-row items-center justify-between px-6 py-5 gap-8 sm:gap-0">
          <Link
            state={cart}
            to="/checkout"
            className="bg-accent text-white px-6 py-3 rounded-lg shadow hover:bg-accent/90 transition w-full sm:w-auto text-center"
          >
            Proceed to Checkout
          </Link>

          <span className="font-bold lg:text-2xl text-xl text-accent">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
