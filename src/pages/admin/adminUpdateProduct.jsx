import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const location = useLocation(); //update ekt enkot data tikath navigate vunad kiyala balann use karan hook ek

  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLabelledPrice] = useState(
    location.state.labelledPrice
  );
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");

    if (token == null) {
      navigate("/login");
      return;
    }

    const promises = []; //promises array

    //images gdk upload karann thiyenkot for loop ekk danva. methana promises gdk tiyenva
    for (let i = 0; i < images.length; i++) {
      // ek ek image me loop ekt gannva ethakot apit ekin ek promises hadagann puluvam
      // promises loop ek athult ekin ek images dagannva
      promises[i] = mediaUpload(images[i]);
    }

    try {
      //image thiyena ganat promises thiyenva image update kalat passe promises array eke
      //methan 1k hari fail unoth pennanne okkom fail vela vage
      let urls = await Promise.all(promises); //methan 1k hari upload karala thibboth paran evayin aluth ek replace venva

      if (urls.length == 0) {
        //url ekk lebilanm(0 nemeyinm) thiyenne images upload karala. 0 kiyanne url ekk dala na
        urls = location.state.images;
      }

      //alternative , valin ena deval kadala gannva
      const alternativeNames = altNames.split(",");

      //backend ekt yavann ona json ek
      const product = {
        productID: productID,
        name: name,
        altNames: alternativeNames,
        description: description,
        images: urls,
        price: price,
        labelledPrice: labelledPrice,
        category: category,
        stock: stock,
      };

      //backend call

      await axios.put(
        import.meta.env.VITE_API_URL + "/api/products/" + productID,
        product,
        {
          //1-> yavann ona url ek , import
          //2-> product
          //3-> token

          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } catch {
      toast.error("An error Occurred");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-primary py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-boardercolor p-8">
        <h2 className="text-2xl font-semibold text-accent mb-6 border-b pb-3">
          Update Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product ID */}
          {/*input eke value ek vidiyt thiyenna ona variable agaya*/}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Product ID
            </label>
            <input
              disabled
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., DS-CR-001"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Name
            </label>
            <input
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., Diamond Shine Night Cream"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Alternative Names */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-2">
              Alternative Names
            </label>
            <input
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Comma-separated e.g., night cream, hydrating cream"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Brief product overview, benefits, and usage."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              className="w-full p-2 border rounded-lg border-boardercolor file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white hover:file:bg-similarcolor"
              onChange={(e) => setImages(e.target.files)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Labelled Price */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Labelled Price
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Category
            </label>
            <select
              className="w-full p-3 border rounded-lg border-boardercolor bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Cream">Cream</option>
              <option value="Loation">Loation</option>
              <option value="Serum">Serum</option>
              <option value="Makeup">Makeup</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Stock
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg border-boardercolor focus:outline-none focus:ring-2 focus:ring-accent"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        {/* Submit / Cancel button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              navigate("/admin/products");
            }}
            className="bg-red-300 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Cancel Product
          </button>

          <button
            onClick={updateProduct}
            className="bg-accent hover:bg-similarcolor text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
