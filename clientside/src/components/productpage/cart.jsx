import axios from 'axios';
import React, { useEffect, useState } from 'react';
import APIURL from '../path';
import { useParams,Link } from 'react-router-dom';
import Navbar  from "../productpage/nav";
import OrderSuccessAnimation from './orderconformation';
import "../css/order.css"
import { ToastContainer, toast } from 'react-toastify';
import LoginPrompt from './LoginPrompt';
import OrderLoadingScreen from './orderprocessing';
import Footer from './footer';


const CartPage = () => {
  const [fullprice, setFullprice] = useState(0);
  const [product, setProducts] = useState([]);
  const[ordersucces,setordersucces]=useState(false)
  const[loading,setLoading]=useState(false)
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
  

  async function ordertheproduct() {
    setLoading(true)
    try {
      const res = await axios.post(APIURL + "/buyproduct", { product,user_id });
      console.log(res);
      if (res.status===200) {
        setordersucces(true)
        setTimeout(() => {
        setordersucces(false)
        setLoading(false)
        window.location.reload()
        }, 10000);
      }
    } catch (error) {
      if (error.response?.data.msg || error.message) {
        setLoading(false)
      }
      toast.error(error.response?.data.msg || error.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.error("Error details:", error.response?.data || error.message);
    }
  }
  console.log(product);
  


 
  return (
    <div className="flex flex-col min-h-screen">
  {/* Cart Content */}
  <Navbar/>
  {user_id?<>
  {ordersucces ? (
    <div className="flex-grow flex items-center mt-15 justify-center animate-appear">
      <OrderSuccessAnimation />
    </div>
  ) : (
    <>
    {loading ? (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100/75 backdrop-blur-sm z-50 animate-fade-in">
    <div className="transform transition-all duration-300 scale-100 hover:scale-105">
      <OrderLoadingScreen />
    </div>
  </div>
) : ""}
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
                <span>{fullprice.toFixed(2) > 2000 ? "Free" : "250"}</span>
              </div>
            </div>
            <div className="flex justify-between py-4">
              <span className="font-medium">Total:</span>
              <span className="font-medium">
                ₹{(fullprice > 2000 ? fullprice : fullprice + 250).toFixed(2)}
              </span>
            </div>
            <button onClick={() => ordertheproduct()} className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div></>
  )}

  {/* footer */}
  <Footer/>
  <ToastContainer/>
  </>
  :(
  <div className='mt-10'>
    <LoginPrompt/>
  </div>
  )}
</div>
  );
};

export default CartPage;