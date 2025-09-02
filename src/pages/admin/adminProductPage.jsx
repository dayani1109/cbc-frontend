import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">Product Management</h1>
        <Link
          to="/admin/add-product"
          className="flex items-center gap-2 bg-accent text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-boardercolor transition-colors"
        >
          <FaRegPlusSquare className="text-xl" />
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-boardercolor">
        <table className="w-full border-collapse">
          <thead className="bg-accent text-white font-bold">
            <tr>
              <th className="py-3 px-4 text-sm font-medium">Image</th>
              <th className="py-3 px-4 text-sm font-medium">Product ID</th>
              <th className="py-3 px-4 text-sm font-medium">Name</th>
              <th className="py-3 px-4 text-sm font-medium">Price</th>
              <th className="py-3 px-4 text-sm font-medium">Labelled Price</th>
              <th className="py-3 px-4 text-sm font-medium">Category</th>
              <th className="py-3 px-4 text-sm font-medium">Stock</th>
              <th className="py-3 px-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-boardercolor bg-white">
            {products.map((item) => (
              <tr
                key={item.productID}
                className="hover:bg-primary transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.images[0]}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="py-3 px-4">{item.productID}</td>
                <td className="py-3 px-4 font-semibold text-secondary">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-green-600 font-medium">
                  Rs.{item.price}
                </td>
                <td className="py-3 px-4 text-gray-500">
                  Rs.{item.labelledPrice}
                </td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4 text-secondary">{item.stock}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <FaRegEdit
                      className="cursor-pointer hover:text-accent hover:scale-110 transition-transform"
                      title="Edit"
                      aria-label="Edit Product"
                      onClick={() => {
                        navigate("/admin/update-product", {
                          // state kiyannenjson ekk update karankot e adal product tike details yavann state json ekk danva
                          state: item,
                        });
                      }}
                    />
                    <IoTrashOutline
                      className="cursor-pointer hover:text-red-500 hover:scale-110 transition-transform"
                      title="Delete"
                      aria-label="Delete Product"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
