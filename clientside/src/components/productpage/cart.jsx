import axios from 'axios';
import React, { useEffect, useState } from 'react';
import APIURL from '../path';
import { useParams,Link } from 'react-router-dom';
import Navbar  from "../productpage/nav";

const CartPage = () => {
  const [fullprice, setFullprice] = useState(0);
  const [product, setProducts] = useState([]);
  
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedProducts = product.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setProducts(updatedProducts);
    // Recalculate total after updating quantity
    calculateTotal(updatedProducts);
  };

  const removeItem = async(id) => {
    const updatedProducts = product.filter(item => item._id !== id);
    try {
      const res = await axios.post(APIURL + "/removecart", { id });
      if (res.status==201) {
        // showsingleproduct()
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  // Function to calculate the total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
    setFullprice(total);
    return total;
  };
  
  const user_id = localStorage.getItem("userId");
  
  useEffect(() => {
    async function showsingleproduct() {
      try {
        const res = await axios.post(APIURL + "/showcart", { user_id });
        console.log(res);
        if (res.status === 200) {
          setProducts(res.data);
          // Calculate total when products are loaded
          calculateTotal(res.data);
        } else {
          setProducts([]);
          setFullprice(0);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
        setFullprice(0);
      }
    }
    showsingleproduct();
  }, [user_id]);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

  async function ordertheproduct(product) {
    try {
      const res = await axios.post(APIURL + "/buyprodct", { product,user_id });
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log(product);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cart Content */}
      <Navbar/>
      <div className="container mx-auto px-6 pb-16 flex-grow overflow-auto">
        {/* Cart Table */}
        <div className="overflow-x-auto max-w-full relative">          
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-left">Product</th>
                <th className="py-4 text-left">Price</th>
                <th className="py-4 text-left">Quantity</th>
                <th className="py-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-6">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => removeItem(item._id)} className="text-red-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <img src={item.images && item.images[0]} alt={item.name} className="h-25" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-6">₹{item.price}</td>
                  <td className="py-6">
                    <div className="flex items-center border rounded-md w-24">
                      <input 
                        type="text" 
                        value={(item.quantity || 1).toString().padStart(2, '0')}
                        className="w-12 text-center py-1 border-none focus:outline-none"
                        readOnly
                      />
                      <div className="flex flex-col">
                        <button 
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                          className="px-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                          className="px-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">₹{item.price * (item.quantity || 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Actions */}
        <div className="flex flex-col md:flex-row justify-between mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded mb-4 w-full md:w-auto hover:bg-gray-50">
             <Link to={"/"}>
             Return To Shop
             </Link> 
            </button>
            
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="border rounded p-6">
              <h3 className="font-medium text-lg mb-4">Cart Total</h3>
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{fullprice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{fullprice.toFixed(2)>2000?"Free":"250"}</span>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-medium">Total:</span>
                <span className="font-medium">
                  ₹{(fullprice > 2000 ? fullprice : fullprice + 250).toFixed(2)}
                </span>              </div>
              <button onClick={()=>ordertheproduct(product)} className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
               order now
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* footer */}
      <footer className="bg-black text-white mt-auto pt-12 pb-6 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            <div>
              <h2 className="text-xl font-bold mb-6">Support</h2>
              <p className="mb-2">111 Bijoy sarani, Dhaka,</p>
              <p className="mb-2">DH 1515, Bangladesh.</p>
              <p className="mb-2">exclusive@gmail.com</p>
              <p className="mb-2">+88015-88888-9999</p>
            </div>

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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;