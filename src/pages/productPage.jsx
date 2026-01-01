import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loder } from "../components/loder";
import ProductCard from "../components/productCard";
import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";

export default function ProductPage() {
  const [products, setProducts] = useState([]); //me usestate 2 aniwa ona
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false); //methan me anvashsha vidiyt 2parak run venva e nisa uda if ek danva
        })
        .catch((error) => {
          console.error("Error fetching Products:", error);
          setIsLoading(false);
          toast.error("Failed to load Product");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
      <Header />
      <div className="w-full h-[100px] flex justify-center items-center ">
        <input
          type="text"
          onChange={async (e) => {
            try {
              if (e.target.value == "") {
                setIsLoading(true);
              } else {
                const searchResult = await axios.get(
                  import.meta.env.VITE_API_URL +
                    "/api/products/search/" +
                    e.target.value
                );
                setProducts(searchResult.data); //result data tika product vidiyt set karagannva
                setIsLoading(false);
              }
            } catch (error) {
              console.error(error.response?.data || error.message);
              toast.error("search failed");
            }
          }} //value change vena hema velavkm
          placeholder="Search Products.."
          className="px-4 py-2 rounded-lg border border-secondary/10 bg-white/80"
        ></input>
      </div>
      {isLoading ? (
        <Loder />
      ) : (
        <div className="w-full h-full flex flex-row flex-wrap bg-primary justify-center">
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}
