import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaRegPlusSquare, FaTrashAlt } from "react-icons/fa";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Loder } from "../../components/loder";

function ProductDeleteConfirm(props) {
  const productID = props.productID;
  const close = props.close;
  const refresh = props.refresh;

  function deleteProduct() {
    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("Product Delete Successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to Delete Product");
      });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center px-4">
      <div className="bg-primary rounded-2xl shadow-xl w-full max-w-md relative p-6">
        {/* Close button (top-right) */}
        <button
          onClick={close}
          className="absolute top-[-42px] right-[-42px] w-[40px] h-[40px] bg-white hover:bg-red-500 rounded-full flex justify-center items-center"
        >
          <IoClose className="text-gray-700 text-lg" />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <FaTrashAlt className="text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
          Delete Product
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete product {""}
          <span className="font-bold">{productID}</span>? This action cannot be
          undone.
        </p>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null); //delete karann ona product id ek
  const [isLoading, setIsLoading] = useState(true); //patam ganiddi loading vevi thiyenne e nisa true

  const navigate = useNavigate();

  useEffect(() => {
    //mek run venne page ek mul vathavt load venkot vitrayi

    if (isLoading) {
      //loading vemin thiyenvanm vitrak me ek parak run karann kiyanva
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setIsLoading(false); //methan me anvashsha vidiyt 2parak run venva e nisa uda if ek danva
        });
    }
  }, [isLoading]); //array ekt dann puluvam climary variable vitryi, numbers, string, boolean anith evat weda karanne na
  //isLoading ek haddissiye hari venas vunoth me function ek aye run venva

  return (
    <div className="w-full h-full p-6 bg-primary">
      {
        isDeleteConfirmVisible && ( //&& this is not and this is if  mek trueb nisa ithuru tika pennann
          <ProductDeleteConfirm
            refresh={() => {
              setIsLoading(true);
            }}
            productID={selectedProductID}
            close={() => {
              setIsDeleteConfirmVisible(false);
            }}
          />
        ) //isDEleteConfirm visiblenm vitharayi productConfirm ek vetenne0 return selected productID
      }

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
        {isLoading ? (
          <Loder /> //isLoading nam (?) pargraph ek pennann nathnm(:) table ek
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-accent text-white font-bold">
              <tr>
                <th className="py-3 px-4 text-sm font-medium">Image</th>
                <th className="py-3 px-4 text-sm font-medium">Product ID</th>
                <th className="py-3 px-4 text-sm font-medium">Name</th>
                <th className="py-3 px-4 text-sm font-medium">Price</th>
                <th className="py-3 px-4 text-sm font-medium">
                  Labelled Price
                </th>
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
                        onClick={() => {
                          setSelectedProductID(item.productID);
                          setIsDeleteConfirmVisible(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
