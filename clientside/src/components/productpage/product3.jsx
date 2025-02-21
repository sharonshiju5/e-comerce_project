import React, { useState } from "react";
import { Image } from "lucide-react";

const ProductVariantCreation = () => {
  const [selectedColors, setSelectedColors] = useState(["Red", "Blue"]);
  const [selectedSizes, setSelectedSizes] = useState(["70x140 cm", "80x160 cm", "100x180 cm"]);

  const productOptions = selectedColors.flatMap((color) =>
    selectedSizes.map((size) => ({ color, size }))
  );

  return (
    <div className="w-full p-8 bg-white">
      {/* Progress Steps */}
      <div className="flex justify-center space-x-8 mb-6">
        {["Product Information", "Product Detail Information", "Product Variant Creation", "Logistics and Shipment", "Bulk Purchase Discounts"].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${index === 2 ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'}`}>
              {index + 1}
            </div>
            <span className="text-sm text-gray-700 mt-1">{step}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-blue-600">Product Variant Creation</h2>

      {/* Product Attributes */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <select className="border p-2 rounded">
          <option>Red, Blue</option>
        </select>
        <select className="border p-2 rounded">
          <option>Tropical Print</option>
        </select>
        <select className="border p-2 rounded">
          <option>70x140 cm, 80x160 cm, 100x180 cm</option>
        </select>
        <select className="border p-2 rounded">
          <option>Stitched</option>
        </select>
      </div>

      {/* Product Options */}
      <h3 className="text-lg font-semibold text-blue-600 mt-6">Product Options</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {productOptions.map((option, index) => (
          <div key={index} className="border border-blue-500 p-2 flex items-center space-x-2 rounded-lg">
            <Image className="w-8 h-8" />
            <span className="text-blue-600 font-semibold">{option.color} & {option.size}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded">Cancel</button>
        <div className="flex space-x-4">
          <button className="border border-gray-500 px-4 py-2 rounded">Draft</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantCreation;