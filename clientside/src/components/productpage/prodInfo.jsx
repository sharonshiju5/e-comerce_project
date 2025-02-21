import { useState } from "react";
import { ImagePlus, Home, Bell, Box, Plus, LogOut } from "lucide-react";

export default function ProductUpload() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const validateName = (value) => {
    if (/[^a-zA-Z ]/g.test(value)) {
      setError("Please enter text only");
    } else {
      setError("");
    }
    setProductName(value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        {/* Step Progress */}
        <div className="flex justify-center gap-8 mb-6 text-gray-600">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full`}>{step}</div>
              <p className="text-sm">Step {step}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-blue-600">Product Information</h3>
        
        {/* Product Name */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded mt-1`}
            value={productName}
            onChange={(e) => validateName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Product Short Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Product Short Description</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter product short description" />
        </div>

        {/* Product Images */}
        <div className="mt-4 border border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center">
          <ImagePlus size={40} className="text-gray-500" />
          <p className="text-gray-500">Browser or Desktop</p>
        </div>

        {/* Product Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Product Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows={4}
            placeholder="A detailed description of the product helps customers to learn more about the product."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </main>
    </div>
  );
}
