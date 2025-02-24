import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'LCD Monitor', price: 650, quantity: 1, image: 'https://via.placeholder.com/80x60' },
    { id: 2, name: 'Hi Gamepad', price: 550, quantity: 2, image: 'https://via.placeholder.com/80x60' }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      {/* <div className="bg-black text-white text-center py-2 text-sm relative">
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="font-semibold">ShopNow</span></p>
        <div className="absolute right-4 top-2 flex items-center">
          <span>English</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div> */}

      {/* Navigation */}
      {/* <nav className="py-4 px-6 border-b flex items-center justify-between">
        <div className="flex items-center space-x-16">
          <h1 className="text-xl font-bold">Exclusive</h1>
          <ul className="hidden md:flex space-x-8">
            <li><a href="#" className="hover:text-red-500">Home</a></li>
            <li><a href="#" className="hover:text-red-500">Contact</a></li>
            <li><a href="#" className="hover:text-red-500">About</a></li>
            <li><a href="#" className="hover:text-red-500">Sign Up</a></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input type="text" placeholder="What are you looking for?" className="bg-gray-100 px-4 py-2 rounded-md w-64 focus:outline-none" />
            <button className="absolute right-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <a href="#" className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </a>
          <a href="#" className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </a>
          <a href="#">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        </div>
      </nav> */}

      {/* Breadcrumb */}
      {/* <div className="container mx-auto px-6 py-4 text-sm">
        <div className="flex items-center">
          <a href="#" className="text-gray-600 hover:text-red-500">Home</a>
          <span className="mx-2">/</span>
          <span className="font-medium">Cart</span>
        </div>
      </div> */}

      {/* Cart Content */}
      <div className="container mx-auto px-6 pb-16">
        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-left">Product</th>
                <th className="py-4 text-left">Price</th>
                <th className="py-4 text-left">Quantity</th>
                <th className="py-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-6">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => removeItem(item.id)} className="text-red-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_510,c_limit/37b262a3-c8c7-49e8-a29f-8d46bc8ab950/nike-by-you-custom-shoes.jpg" alt={item.name} className="w-20 h-14 object-cover" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-6">${item.price}</td>
                  <td className="py-6">
                    <div className="flex items-center border rounded-md w-24">
                      <input 
                        type="text" 
                        value={item.quantity.toString().padStart(2, '0')} 
                        className="w-12 text-center py-1 border-none focus:outline-none"
                        readOnly
                      />
                      <div className="flex flex-col">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Actions */}
        <div className="flex flex-col md:flex-row justify-between mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded mb-4 w-full md:w-auto hover:bg-gray-50">
              Return To Shop
            </button>
            <div className="flex mt-4">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="border rounded-l px-4 py-2 focus:outline-none focus:border-red-500 w-full"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-red-600">
                Apply Coupon
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="border rounded p-6">
              <h3 className="font-medium text-lg mb-4">Cart Total</h3>
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-medium">Total:</span>
                <span className="font-medium">${calculateSubtotal()}</span>
              </div>
              <button className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
                Process to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-auto pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Exclusive</h2>
              <h3 className="mb-4">Subscribe</h3>
              <p className="mb-4">Get 10% off your first order</p>
              <div className="flex border-b border-gray-700 pb-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent focus:outline-none w-full"
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
              <p className="mb-2">111 Bijoy sarani, Dhaka,</p>
              <p className="mb-2">DH 1515, Bangladesh.</p>
              <p className="mb-2">exclusive@gmail.com</p>
              <p className="mb-2">+88015-88888-9999</p>
            </div>

            {/* Column 3 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Account</h2>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">My Account</a></li>
                <li><a href="#" className="hover:text-gray-300">Login / Register</a></li>
                <li><a href="#" className="hover:text-gray-300">Cart</a></li>
                <li><a href="#" className="hover:text-gray-300">Wishlist</a></li>
                <li><a href="#" className="hover:text-gray-300">Shop</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h2 className="text-xl font-bold mb-6">Quick Link</h2>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms Of Use</a></li>
                <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
            <p>© Copyright Rimel 2022. All right reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;