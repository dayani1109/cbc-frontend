import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Loder } from "../components/loder";
import ImageSlider from "../components/imageSlider";

export default function ProductOverview() {
  const params = useParams();
//loading,success,error
const [status, setStatus] = useState("loading")
const [product, setProduct] = useState(null)//change vena anith variable ek

  //me page ek load veddi ena id ek backend ekt yavala ithuru details genna gannva
  // palaveni vatahavt load veddi thama meka venna ona

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success")
      }).catch(
        ()=>{
            toast.error("Failed to fetch product details")
            setStatus("error")
        }
      )
  }, []);

return (
  <div className="w-full min-h-[calc(100vh-100px)] bg-gradient-to-b from-primary to-white text-secondary">

    {status === "loading" && <Loder />}

    {status === "success" && (
      <div className="w-full flex flex-col md:flex-row px-6 md:px-16 py-10 gap-12">

        {/* LEFT: IMAGE SECTION */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[450px] rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-boardercolor/30 p-5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300">
            <ImageSlider images={product.images} />
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="w-full md:w-1/2 flex flex-col gap-7">

          {/* Product ID */}
          <span className="px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm self-start border border-accent/30">
            {product.productID}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-secondary">
            {product.name}
            {product.altNames.map((name, idx) => (
              <span key={idx} className="text-xl font-normal text-secondary/70">
                {" | " + name}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="text-secondary/80 text-[17px] leading-relaxed tracking-wide">
            {product.description}
          </p>

          {/* Category */}
          <p className="text-lg font-semibold text-secondary">
            Category: <span className="text-accent">{product.category}</span>
          </p>

          {/* Price */}
          <div className="mt-2">
            {product.labelledPrice > product.price ? (
              <div className="flex gap-4 items-end">
                <p className="text-2xl text-secondary/40 font-medium line-through">
                  LKR {product.labelledPrice.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-accent">
                  LKR {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold text-accent">
                LKR {product.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="w-full flex gap-6 pt-6">

            {/* ADD TO CART */}
            <button
              className="w-1/2 h-[50px] rounded-xl bg-accent text-white font-semibold shadow-lg 
              hover:bg-accent/90 hover:shadow-[0_10px_25px_rgba(154,63,63,0.45)] 
              transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              Add to Cart
            </button>

            {/* BUY */}
            <button
              className="w-1/2 h-[50px] rounded-xl border-2 border-accent text-accent font-semibold shadow-md 
              hover:bg-accent hover:text-white hover:shadow-[0_10px_25px_rgba(154,63,63,0.35)]
              transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>
    )}

    {status === "error" && (
      <h1 className="text-red-500 text-center mt-20 text-xl font-semibold">
        Failed to load product details
      </h1>
    )}
  </div>
);

}
