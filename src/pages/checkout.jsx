import { FaCaretDown, FaSortUp } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state); //cart ek load venva patangaddi cart ekt value enne mekem

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    //order button ek click kalam vena de
    //mulinm check karann ona login vela inn user kenekd kiyala

    const token = localStorage.getItem("token");

    if (token == null) {
      //login vela nathnm
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const items = []; //ena item tika dala thiyagann array ekk hadanva
      for (let i = 0; i < cart.length; i++) {
        items.push(
          //item ekem item ek push karanva
          {
            productID: cart[i].productID, //push karankot product id ekayi quantity ekayi vitrayi  push karanne
            quantity: cart[i].quantity,
          }
        );
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: "No 123, Main Street, Matara", //address ek vitarayi yavanne anthi eva usergem gannva
          items: items, //uda items array ekath yavanva
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");
    } catch (error) {
      // toast.error("Failed to place order");
      // console.error(error);

      // //if error is 400
      // if(error.response && error.response.status == 400){

      // 	toast.error(error.response.data.message)

      // }

      // If backend sent a 400 error with custom message
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        return;
      }

      // Default error message for other error codes
      toast.error("Failed to place order");
      console.error(error);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col pt-[30px] items-center">
      <div className="w-full max-w-[650px] flex flex-col gap-5 px-4">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[140px] bg-white rounded-xl shadow-md hover:shadow-lg 
              transition-all flex items-center p-4 relative"
            >
              <button
                className="absolute -right-12 top-4 text-red-500 bg-red-100 hover:bg-red-500 hover:text-white
                  transition-all rounded-full p-2 shadow"
                onClick={() => {
                  // delete logic should go here (logic untouched)
                }}
              >
                <FaRegTrashCan size={18} />
              </button>

              <img
                className="h-full aspect-square object-cover rounded-lg shadow-sm"
                src={item.image}
              />

              <div className="w-[200px] h-full flex flex-col pl-[10px] pt-[10px]">
                <h1 className="font-semibold text-lg w-full text-wrap text-secondary leading-tight">
                  {item.name}
                </h1>
                {/*productID */}
                <span className="text-sm text-secondary opacity-60">
                  {item.productID}
                </span>
              </div>

              <div className="w-[90px] h-full flex flex-col justify-center items-center">
                <FaSortUp
                  className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                  onClick={() => {
                    const newCart = [...cart]; //cart ekem copyyak hadala e variable ek newCart kiyala ekkt dagaththa

                    newCart[index].quantity += 1; //newCart eke adala index eka aragen e index ekt adala eke quantity ek 1kin wedi kala
                    setCart(newCart); //newCart ek set kara gannva
                  }}
                />
                <span className="font-bold text-2xl text-secondary">
                  {item.quantity}
                </span>
                <FaCaretDown
                  className="text-3xl cursor-pointer text-secondary hover:text-accent transition"
                  onClick={() => {
                    const newCart = [...cart]; //cart ekem copyyak hadala e variable ek newCart kiyala ekkt dagaththa

                    if (newCart[index].quantity > 1) {
                      //1ta wada wedinm witrayi
                      newCart[index].quantity -= 1; //newCart eke adala index eka aragen e index ekt adala eke quantity ek 1kin adu kala
                    }

                    setCart(newCart); //newCart ek set kara gannva
                  }}
                />
              </div>

              <div className="w-[150px]  h-full flex flex-col items-end">
                {item.labelledPrice > item.price && (
                  <span
                    className="text-secondary w-full text-right pr-[10px] line-through 
                        text-lg opacity-60 mt-[20px]"
                  >
                    LKR {item.labelledPrice.toFixed(2)}
                  </span>
                )}
                <span
                  className="text-accent font-bold w-full text-right pr-[10px]  
                    text-2xl mt-[5px]"
                >
                  LKR {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}

        <div className="w-full h-[130px] bg-white rounded-xl shadow-md flex justify-between items-center px-6">
          <button
            to="/checkout"
            onClick={purchaseCart}
            className="bg-accent text-white px-6 py-3 rounded-lg shadow hover:bg-accent/90 
            transition font-semibold hover:scale-[1.02] active:scale-95"
          >
            Order
          </button>

          <div className="h-[50px] flex items-center">
            <span className="font-bold text-accent w-full text-right text-2xl mt-[5px]">
              Total: LKR {getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
