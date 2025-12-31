import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loder } from "../components/loder";
import ProductCard from "../components/productCard";
import axios from "axios";
import Footer from "../components/footer";

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
      {isLoading ? (
        <Loder />
      ) : (
        <div className="w-full h-full flex flex-row flex-wrap bg-primary justify-center">
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
      <Footer/>
    </div>
  );
}
