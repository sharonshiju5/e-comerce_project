import React, { useState } from "react";

const ProductCategorySelection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["Beach Towels"]);

  const categories = [
    { name: "Beach Towels", breadcrumbs: "Home&Living > Bathroom > Beach Towels" },
    { name: "Bath Towels", breadcrumbs: "Home&Living > Bathroom > Bath Towels" },
    { name: "Tea Towels", breadcrumbs: "Home&Living > Kitchen & Dining > Tea Towels" },
    { name: "Hooded Towels", breadcrumbs: "Home&Living > Bathroom > Hooded Towels" },
    { name: "Towel Racks & Rods", breadcrumbs: "Home&Living > Bathroom > Towel Racks & Rods" }
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

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

      <h2 className="text-xl font-bold text-green-600">Select a category</h2>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="🔍 Search for a category" 
        className="w-full border rounded p-2 mt-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-600">Results</h3>
        {filteredCategories.map((cat, index) => (
          <div key={index} className="flex items-start space-x-2 mt-2">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes(cat.name)} 
              onChange={() => toggleCategory(cat.name)}
            />
            <div>
              <span className="text-blue-600 font-semibold cursor-pointer">{cat.name}</span>
              <p className="text-sm text-gray-500">{cat.breadcrumbs}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button className="bg-blue-500 text-white p-2 px-6 rounded mt-6 w-full">
        Save
      </button>
    </div>
  );
};

export default ProductCategorySelection;
