import React from 'react';

const WishlistPage = () => {
  // Sample wishlist items data
  const wishlistItems = [
    {
      id: 1,
      name: 'Gucci duffle bag',
      image: '/api/placeholder/200/150',
      price: 960,
      originalPrice: 1160,
      discount: '-35%'
    },
    {
      id: 2,
      name: 'RGB liquid CPU Cooler',
      image: '/api/placeholder/200/150',
      price: 1560,
      originalPrice: 1560,
    },
    {
      id: 3,
      name: 'GP11 Shooter USB Gamepad',
      image: '/api/placeholder/200/150',
      price: 550,
      originalPrice: 550,
    },
    {
      id: 4,
      name: 'Quilted Satin Jacket',
      image: '/api/placeholder/200/150',
      price: 750,
      originalPrice: 750,
    }
  ];

  // Sample recommended items data
  const recommendedItems = [
    {
      id: 5,
      name: 'ASUS FHD Gaming Laptop',
      image: '/api/placeholder/200/150',
      price: 960,
      originalPrice: 1160,
      rating: 5,
      reviewCount: 65,
      discount: '-35%'
    },
    {
      id: 6,
      name: 'IPS LCD Gaming Monitor',
      image: '/api/placeholder/200/150',
      price: 1160,
      originalPrice: 1160,
      rating: 5,
      reviewCount: 65,
    },
    {
      id: 7,
      name: 'HAVIT HV-G92 Gamepad',
      image: '/api/placeholder/200/150',
      price: 560,
      originalPrice: 560,
      rating: 5,
      reviewCount: 65,
      new: true
    },
    {
      id: 8,
      name: 'AK-900 Wired Keyboard',
      image: '/api/placeholder/200/150',
      price: 200,
      originalPrice: 200,
      rating: 5,
      reviewCount: 65,
    }
  ];

  // Function to render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (  
    <div className="flex flex-col min-h-screen">
      {/* Top banner */}
      <div className="bg-black text-white py-3 px-4 text-center relative">
        <p className="text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <span className="font-semibold">ShopNow</span>
        </p>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
          <span className="text-sm">English</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-8 px-4">
        {/* Wishlist header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium">Wishlist (4)</h2>
          <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
            Move All To Bag
          </button>
        </div>

        {/* Wishlist items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative bg-gray-50 p-3 rounded group">
              {item.discount && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {item.discount}
                </div>
              )}
              <button className="absolute top-3 right-3 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="mb-3 flex justify-center">
                <img src={item.image} alt={item.name} className="h-40 object-contain" />
              </div>
              <div className="text-center mb-2">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-red-600 font-medium">${item.price}</span>
                  {item.originalPrice !== item.price && (
                    <span className="text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </div>
              <button className="w-full bg-black text-white py-2 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add To Cart</span>
              </button>
            </div>
          ))}
        </div>

        {/* Just For You section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-red-500 w-5 h-10 mr-3"></div>
              <h2 className="text-lg font-medium">Just For You</h2>
            </div>
            <a href="#" className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
              See All
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((item) => (
              <div key={item.id} className="relative bg-gray-50 p-3 rounded group">
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {item.discount}
                  </div>
                )}
                {item.new && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                <button className="absolute top-3 right-3 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <div className="mb-3 flex justify-center">
                  <img src={item.image} alt={item.name} className="h-40 object-contain" />
                </div>
                <div className="mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-medium">${item.price}</span>
                    {item.originalPrice !== item.price && (
                      <span className="text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-500">({item.reviewCount})</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-2 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add To Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Exclusive</h2>
              <h3 className="mb-4">Subscribe</h3>
              <p className="mb-4 text-gray-300">Get 10% off your first order</p>
              <div className="flex border-b border-gray-700 pb-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent focus:outline-none w-full text-gray-300"
                />
                <button>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Support</h2>
              <ul className="space-y-2 text-gray-300">
                <li>111 Bijoy sarani, Dhaka,</li>
                <li>DH 1515, Bangladesh.</li>
                <li>exclusive@gmail.com</li>
                <li>+88015-88888-9999</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Account</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">My Account</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Login / Register</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cart</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Wishlist</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Shop</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Quick Link</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms Of Use</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© Copyright Rimel 2022. All right reserved</p>
            </div>
            <div className="flex space-x-4">
              <h2 className="text-lg font-bold mr-4">Download App</h2>
              <div>
                <p className="text-xs text-gray-400 mb-2">Save $3 with App New User Only</p>
                <div className="flex items-center">
                  <div className="mr-2">
                    <img src="/api/placeholder/100/100" alt="QR Code" className="w-20 h-20" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <a href="#"><img src="/api/placeholder/120/40" alt="Google Play" className="h-8" /></a>
                    <a href="#"><img src="/api/placeholder/120/40" alt="App Store" className="h-8" /></a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-8">
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WishlistPage;