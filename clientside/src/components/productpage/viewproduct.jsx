import React, { useState } from 'react';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    '/api/placeholder/500/500',
    '/api/placeholder/500/500',
    '/api/placeholder/500/500',
    '/api/placeholder/500/500'
  ];

  const relatedProducts = [
    {
      id: 1,
      name: 'HAVIT HV-G92 Gamepad',
      price: 120,
      oldPrice: 160,
      discount: '-40%',
      rating: 4.8,
      reviews: 88,
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'AK-900 Wired Keyboard',
      price: 960,
      oldPrice: 1160,
      discount: '-25%',
      rating: 4.7,
      reviews: 75,
      image: '/api/placeholder/200/200'
    },
    {
      id: 3,
      name: 'IPS LCD Gaming Monitor',
      price: 370,
      oldPrice: 400,
      discount: '-30%',
      rating: 4.9,
      reviews: 99,
      image: '/api/placeholder/200/200'
    },
    {
      id: 4,
      name: 'RGB liquid CPU Cooler',
      price: 160,
      oldPrice: 170,
      rating: 4.8,
      reviews: 65,
      image: '/api/placeholder/200/200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 -mx-4">
        <p>Summer Sale For All Swim Suits And Free Express Delivery - Off 50%! 
          <span className="ml-2 underline cursor-pointer">ShopNow</span>
        </p>
      </div>

      {/* Navigation */}
      {/* <nav className="flex items-center justify-between py-4">
        <div className="text-xl font-bold">Exclusive</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">Contact</a>
          <a href="#" className="hover:text-red-500">About</a>
          <a href="#" className="hover:text-red-500">Sign Up</a>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="What are you looking for?"
            className="px-4 py-2 bg-gray-100 rounded-md"
          />
          <button className="hover:text-red-500">❤️</button>
          <button className="hover:text-red-500">🛒</button>
          <button className="hover:text-red-500">👤</button>
        </div>
      </nav> */}

      {/* Breadcrumb */}
      <div className="flex gap-2 text-gray-500 my-4">
        <span>Account</span>
        <span>/</span>
        <span>Gaming</span>
        <span>/</span>
        <span className="text-black">Havic HV G-92 Gamepad</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {images.map((img, idx) => (
              <div 
                key={idx}
                className={`w-20 h-20 border rounded cursor-pointer ${selectedImage === idx ? 'border-red-500' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1">
            <img src={images[selectedImage]} alt="Main product view" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Havic HV G-92 Gamepad</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">{'★'.repeat(4)}{'☆'.repeat(1)}</div>
            <span className="text-gray-500">(150 Reviews)</span>
            <span className="text-green-500">| In Stock</span>
          </div>
          <div className="text-2xl font-semibold mb-4">$192.00</div>
          <p className="text-gray-600 mb-6">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
          </p>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Colours:</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-200"></button>
              <button className="w-8 h-8 rounded-full bg-red-400"></button>
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${size === 'M' ? 'bg-red-500 text-white' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center border rounded">
              <button 
                className="px-4 py-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button 
                className="px-4 py-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-red-500 text-white px-8 py-2 rounded">
              Buy Now
            </button>
            <button className="border border-red-500 p-2 rounded">
              ❤️
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl">🚚</span>
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">↩️</span>
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <p className="text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="my-12">
        <h2 className="text-red-500 font-semibold mb-6">Related Item</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(product => (
            <div key={product.id} className="group relative">
              <div className="relative">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                    {product.discount}
                  </span>
                )}
                <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️
                </button>
                <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 opacity-0 group-hover:opacity-90 transition-opacity">
                  Add To Cart
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex gap-2 text-red-500">
                  <span>${product.price}</span>
                  <span className="text-gray-400 line-through">${product.oldPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</div>
                  <span className="text-gray-500">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;