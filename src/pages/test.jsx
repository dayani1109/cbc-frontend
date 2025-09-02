import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  {
    /* me react hook function ekem array ekk denava. e array eke dewal 2k thiyenva variable , function */
  }
  // const[count,setCount] = useState(10);
  // const[status,setStatus] = useState("online");

  const [file, setFile] = useState(null); //file save karagann variable ek, change karann setFile and arambaka agaya null

  async function uploadImage() {
    const link = await mediaUpload(file);
    console.log(link);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]); //file ek change vena hema time ekakm file ek me array ekt dagannva
        }}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={uploadImage}
      >
        Upload
      </button>
    </div>
  );
}
