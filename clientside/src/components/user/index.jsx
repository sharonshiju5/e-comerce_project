import "../css/index.css"
import { useEffect,useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { Menu,Store ,Filter , X, Search, ShoppingCart, User, LogOut, Settings, Heart,  } from 'lucide-react';
import puma from "../../assets/puma.png"
import Navbar from "../productpage/nav"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import axios from "axios";
import { motion } from "framer-motion";
import APIURL from "../path";

export default function HomePage({useremail}) {
  
  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const[input,setInput]=useState(true)
  const[filter,setFilter]=useState(true)
  const [price, setPrice] = useState(100);
  
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
    const navLinks = [
      { name: 'Home', href: '#' },
      { name: 'Products', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' }
    ];
    function showinput() {
      setInput(!input)
    }
    const user_id=localStorage.getItem("userId")
    
    const profileMenuItems = [
      { name: 'My Profile', icon: User, link: 'userprofile' },
      { name: 'Settings', icon: Settings , link: 'settings'},
      { name: 'Wishlist', icon: Heart , link: 'wishlist'},
    ];
    
    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };
    function showfilter() {
      setFilter(!filter)
    }
    const categories = [
      { id: 1, name: 'jeance', icon: 'https://cdn-icons-png.flaticon.com/128/5258/5258257.png' },
      { id: 2, name: 'shirts', icon: 'https://cdn-icons-png.flaticon.com/128/2503/2503380.png'  },
      { id: 3, name: 'watch', icon: 'https://cdn-icons-png.flaticon.com/128/3109/3109881.png' },
      { id: 4, name: 'jacket', icon: 'https://cdn-icons-png.flaticon.com/128/7223/7223203.png' },
      { id: 5,name: 'skirt', icon: 'https://cdn-icons-png.flaticon.com/128/2793/2793843.png' },
      { id: 6, name: 'shoes', icon: "https://cdn-icons-png.flaticon.com/128/1785/1785348.png" }
    ];

// console.log(price);

useEffect(() => {

  async function showProducts() {
    try {
        const res = await axios.post(APIURL + "/showproduct");
        
        if (res.status === 200) { 
            setProducts(res.data.Data || []); 
        }

        console.log("API Response:", res);
      
    } catch (error) {
        setError("Failed to load products.");
    } finally {
        setLoading(false);
    }
}

showProducts();

}, []);

  function viewProdct(_id) {
    navigate(`/productview/${_id}`)
  }

  function logout() {
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }

  
  async function wishlist(product_id) {
      if (token) {
      try {
        const user_id=localStorage.getItem("userId")
        console.log(product_id);
        const res=await axios.post(APIURL+"/addtowishlist",{product_id,user_id})
        if (res.status==201) {      
          
        }
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    else{
      alert("login to add product to wishlist")
    }
  }
    return(
        <>

    <Navbar/> 
    
    <div className="container">

  

    <div className="max-w-7xl mx-auto px-4">
      {/* Apple Banner */}
      <div className="bg-black text-white rounded-lg overflow-hidden mb-8">
        <div className="relative">
          <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1719,c_limit/2f8b228a-5141-4e2c-b846-d6e028faaed3/nike-just-do-it.jpg" alt="Apple Products" className="w-full h-58 object-cover" />
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <h2 className="text-2xl font-bold mb-2">Up to 10% off Voucher</h2>
            <button className="text-sm underline">Shop Now →</button>
          </div>
        </div>
      </div>

      {/* Flash Sales */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Flash Sales up to 60% off</h2>
          <div className="flex gap-2">
            <div className="bg-gray-100 px-3 py-1 rounded">03</div>
            <div className="bg-gray-100 px-3 py-1 rounded">23</div>
            <div className="bg-gray-100 px-3 py-1 rounded">19</div>
            <div className="bg-gray-100 px-3 py-1 rounded">56</div>
          </div>
        </div>
        <div className="relative w-full">
      {/* Carousel Container */}
      <div className="flex items-center">
        {/* Left Navigation Button */}
        <button className="absolute left-0 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Product List */}
        <div className="flex gap-4 overflow-x-auto custom-scrollbar whitespace-nowrap min-h-65 px-12">
        {products
          .filter(item => item.offer === 60)
          .map(item => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow hover:scale-[1.02] transition-transform duration-300 min-w-[250px]  relative"
            >{item.offer==0?"":
              <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">
            - {item.offer}%
            </div>}
            <div className="absolute right-[15px] top-3 z-30">
              <Heart onClick={() => {
                  const prodId = item._id;
                  console.log("Address ID to delete:", prodId);
                  wishlist(prodId);
              }} className="w-5 h-5 text-gray-600 cursor-pointer" strokeWidth={1.5} />
            </div>
             <Swiper
                modules={[Navigation, Pagination]}
                  navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                className="w-[220px] rounded-lg h-[270px] "
              >
                {item.images.map((image, index) => (
                  <SwiperSlide key={index} onClick={() => {
                    const prodId = item._id;
                    console.log("Address ID to delete:", prodId);
                    viewProdct(prodId);
                }} className="flex  justify-center w-[300px] items-center">
                    {/* Wrapper div to enforce consistent sizing */}
                    {/* <div className="w-[300px] h-[200px] flex justify-center items-center overflow-hidden"> */}
                      <img
                        src={image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    {/* </div> */}
                  </SwiperSlide>
                ))}
              </Swiper>

              <h3 className="font-medium">{item.name}</h3>
              <div className="text-[10px] text-gray-600">
              {item.description}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-red-500">₹{item.price}</span>
                <span className="text-gray-400 line-through text-sm">
                ₹{(item.price / (1 - 0.60)).toFixed(2)}
                </span>
              </div>
            </div>
            
          ))}
        </div>

        {/* Right Navigation Button */}
        <button className="absolute right-0 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Browse By Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center p-4 border  rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* <span className="text-2xl mb-2">{category.icon}</span> */}
              <img  className="text-2xl mb-2 h-14"  src={category.icon} alt="" />
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Best Selling Products in shirts</h2>
          <button className="text-red-500">View All</button>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> */}
        <div className="relative w-full">
      {/* Carousel Container */}
      <div className="flex items-center">
        {/* Left Navigation Button */}
        <button className="absolute left-0 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Product List */}
        <div className="flex gap-4 overflow-x-auto custom-scrollbar whitespace-nowrap min-h-65 px-12">

        {products
          .filter(item => item.category == "shirts")
          .map(item => (
            
            <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow hover:scale-[1.02] transition-transform duration-300 min-w-[250px]  relative"
          >{item.offer==0?"":
            <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">
          {item.offer}
          </div>}
          <div className="absolute right-[15px] top-3 z-30">
            <Heart onClick={() => {
                  const prodId = item._id;
                  console.log("Address ID to delete:", prodId);
                  wishlist(prodId);
              }} className="w-5 h-5 text-gray-600 cursor-pointer" strokeWidth={1.5} />
          </div>
           <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-[220px] rounded-lg h-[270px] "
            >
              {item.images.map((image, index) => (
                <SwiperSlide key={index} className="flex  justify-center w-[300px] items-center"
                onClick={() => {
                  const prodId = item._id;
                  console.log("Address ID to delete:", prodId);
                  viewProdct(prodId);
              }}>
                  {/* <div className="w-[300px] h-[200px] flex justify-center items-center overflow-hidden"> */}
                    <img
                      src={image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  {/* </div> */}
                </SwiperSlide>
              ))}
            </Swiper>

            <h3 className="font-medium">{item.name}</h3>
            <div className="text-[10px] text-gray-600">
            {item.description}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-red-500">₹{item.price}</span>
              <span className="text-gray-400 line-through text-sm">
              ₹{(item.price / (1 - 0.60)).toFixed(2)}
              </span>
            </div>
          </div>
          ))}
                  </div>

          <button className="absolute right-0 z-10 bg-white p-2 shadow rounded-full hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
          </div>
        </div>
      </div>

      <div className="bg-black text-white rounded-lg p-8 mb-8 footerimage">
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-2xl font-bold mb-2">Enhance Your comfort</h2>
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full">Shop Now</button>
          </div>
          <img src={puma} alt="Speaker" className="w-84 h-84 object-contain" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-sm text-gray-600">Free delivery for all orders over $100</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-sm text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>

    </div>
        </>
    )
}