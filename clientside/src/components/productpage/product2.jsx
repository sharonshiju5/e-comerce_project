import React from "react";

const ProductDetailInfo = () => {
  return (
    <div className="w-full p-8 bg-white">
      {/* Progress Steps */}
      <div className="flex justify-center space-x-8 mb-6">
        {["Product Information", "Product Detail Information", "Product Variant Creation", "Logistics and Shipment", "Bulk Purchase Discounts"].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${index === 1 ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'}`}>
              {index + 1}
            </div>
            <span className="text-sm text-gray-700 mt-1">{step}</span>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button className="text-gray-700 mb-4">&#8592; Back</button>

      {/* Product Detail Information */}
      <h2 className="text-xl font-bold text-blue-600">Product Detail Information</h2>

      {/* Product Category */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold">Product Category</label>
        <select className="w-full border rounded p-2 mt-2">
          <option>Beach Towels</option>
        </select>
      </div>

      {/* Breadcrumb */}
      <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
        <span className="text-green-600">&#x1F331;</span>
        <span className="text-blue-600">Home&Living</span>
        <span>›</span>
        <span className="text-blue-600">Bathroom</span>
        <span>›</span>
        <span className="text-blue-600">Beach Towels</span>
      </div>

      {/* Product Specification */}
      <h3 className="mt-6 text-lg font-semibold">Product Specification</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <select className="border p-2 rounded">
          <option>100% Cotton</option>
        </select>
        <select className="border p-2 rounded">
          <option>300 g/m²</option>
        </select>
        <select className="border p-2 rounded">
          <option>Machine Woven</option>
        </select>
        <select className="border p-2 rounded">
          <option>Quick-Drying</option>
        </select>
      </div>

      {/* Product Tags */}
      <h3 className="mt-6 text-lg font-semibold">Product Tags</h3>
      <p className="text-green-600 text-sm">Recommended Tags</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {["Pure Cotton Beach Towel", "Beach Towel Essential", "Soft & Plush Beach Towel", "Rapid Dry Beach Towel", "Elegant Embossed", "Vibrant Colors", "Lightweight & Compact", "Sand Resistant", "Stylish Design", "Dermatologist Approved"].map((tag, index) => (
          <button key={index} className="border px-3 py-1 rounded-full flex items-center space-x-2 border-blue-500 text-blue-500">
            <span>{tag}</span>
            <span className="text-lg">+</span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button className="border p-2 px-4 rounded flex items-center space-x-2 text-gray-700 border-gray-400">
          <span>&#128465;</span>
          <span>Cancel</span>
        </button>
        <div className="flex space-x-4">
          <button className="border p-2 px-4 rounded flex items-center space-x-2 text-gray-700 border-gray-400">
            <span>&#128190;</span>
            <span>Draft</span>
          </button>
          <button className="bg-blue-500 text-white p-2 px-6 rounded flex items-center space-x-2">
            <span>Continue</span>
            <span>&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
