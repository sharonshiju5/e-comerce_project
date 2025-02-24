import "../css/index.css"
import { useEffect,useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { Menu,Store ,Filter , X, Search, ShoppingCart, User, LogOut, Settings, Heart,  } from 'lucide-react';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import axios from "axios";
import { motion } from "framer-motion";
import APIURL from "../path";

export default function HomePage({useremail}) {
  

  const flashSales = [
    { id: 1, name: 'PS4 Controller', price: 29.99, originalPrice: 49.99, image: '/api/placeholder/200/200', rating: 4.5 },
    { id: 2, name: 'RGB Gaming Keyboard', price: 59.99, originalPrice: 89.99, image: '/api/placeholder/200/200', rating: 4.8 },
    { id: 3, name: 'Gaming Monitor', price: 199.99, originalPrice: 299.99, image: '/api/placeholder/200/200', rating: 4.7 },
    { id: 4, name: 'Comfort Chair', price: 129.99, originalPrice: 159.99, image: '/api/placeholder/200/200', rating: 4.6 }
  ];

  const categories = [
    { id: 1, name: 'Phones', icon: '📱' },
    { id: 2, name: 'Computers', icon: '💻' },
    { id: 3, name: 'Smartwatch', icon: '⌚' },
    { id: 4, name: 'Cameras', icon: '📸' },
    { id: 5, name: 'Headphones', icon: '🎧' },
    { id: 6, name: 'Gaming', icon: '🎮' }
  ];

  const bestSelling = [
    { id: 1, name: 'Red Jacket', price: 89.99, image: '/api/placeholder/200/200', rating: 4.8 },
    { id: 2, name: 'Brown Bag', price: 119.99, image: '/api/placeholder/200/200', rating: 4.7 },
    { id: 3, name: 'RGB Cooler', price: 49.99, image: '/api/placeholder/200/200', rating: 4.9 },
    { id: 4, name: 'Boots', price: 79.99, image: '/api/placeholder/200/200', rating: 4.6 }
  ];




  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const[input,setInput]=useState(true)
    const[filter,setFilter]=useState(true)
    const [price, setPrice] = useState(100); // Initial price value

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

// console.log(price);

useEffect(() => {

  async function showProducts() {
    try {
        const res = await axios.post(APIURL + "/showproduct");
        
        if (res.status === 200) { 
            setProducts(res.data.Data || []); // ✅ Ensure Data exists
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

    return(
        <>
 <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600 cursor-pointer">
              Shippe
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!showSearch && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            {showSearch && (
              <div className="flex items-center w-full max-w-md animate-slideIn">
                <input
                  type="text"
                  placeholder="Search..."
                  className="hide-input"
                  autoFocus
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Store   className="h-5 w-5 text-gray-600" />
            </button>
            {/* Profile Menu */}
            <div className="relative profile-menu">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {profileMenuItems.map((item, index) => (
                      <Link
                        to={item.link}
                        key={item.name}
                        className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200
                          ${index === profileMenuItems.length - 1 ? 'border-t border-gray-100' : ''}`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <a
                      href="#"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200`}>
                      <LogOut className="h-4 w-4 mr-3" />
                      <span>LogOut</span>
                    </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="px-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black-500 focus:outline-none"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  {link.name}
                </a>
              ))}
              

              {/* Mobile Profile Menu */}
              <div className="px-3 pt-4 border-t">
                {profileMenuItems.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.name}</span>
                  </a>
                ))}
                <a href="#"
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200`}>
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>LogOut</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="subnav">
        <div className="nav-filter-div">
          <button onClick={showfilter} className="p-2 duration-200">
           <Filter className="filter-icon  h-5 w-5 text-gray-600" />
          </button>
        </div>
        <p>Get additional 10% off* on your first purchase. Use Code VHGET10.</p>
        <div className="nav-filter-div">
        </div>
      </div>
    </nav>
    {
      filter?"":
      <div className="filter-div animate-slideInleft">
        <div className="filter-category">
        <span>choose category</span>
          <select name="brand" id="">brand
            <option value="">fashion</option>
            <option value="">electronic</option>
            <option value="">grocery</option>
            <option value="">shoes</option>
            <option value="">acceseres</option>
          </select>
        </div>
        <div className="filter-brand">
          <span>choose brand</span>
          <select name="brand" id="">brand
            <option value="">nike</option>
            <option value="">puma</option>
            <option value="">adidads</option>
            <option value="">zara</option>
            <option value="">mhr</option>
          </select>
        </div>
        <div className="filter-price">
          <h3 className="font-medium">Price Range</h3>
          <span>{price}00 rupes</span>
          <input type="range"
          name="price"
          value={price} // Bind input value to state
          onChange={(e) => setPrice(e.target.value)}           className="w-full" />
       </div>
    </div>
    }
    <div className="container">

  

    <div className="max-w-7xl mx-auto px-4">
      {/* Apple Banner */}
      <div className="bg-black text-white rounded-lg overflow-hidden mb-8">
        <div className="relative">
          <img src="/api/placeholder/1200/300" alt="Apple Products" className="w-full h-48 object-cover" />
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <h2 className="text-2xl font-bold mb-2">Up to 10% off Voucher</h2>
            <button className="text-sm underline">Shop Now →</button>
          </div>
        </div>
      </div>

      {/* Flash Sales */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Flash Sales</h2>
          <div className="flex gap-2">
            <div className="bg-gray-100 px-3 py-1 rounded">03</div>
            <div className="bg-gray-100 px-3 py-1 rounded">23</div>
            <div className="bg-gray-100 px-3 py-1 rounded">19</div>
            <div className="bg-gray-100 px-3 py-1 rounded">56</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-scroll">
          {products.map(item => (
            <div 
              key={products._id}
              className="bg-white p-4 rounded-lg shadow hover:scale-[1.02] transition-transform duration-300"
            >  <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-40 rounded-lg"
          >
            {item.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={image} 
                  alt={item.name} 
                  className="w-full h-40 object-cover rounded-lg mb-3" 
                />
              </SwiperSlide>
            ))}
          </Swiper>
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-red-500">${item.price}</span>
                <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Browse By Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Best Selling Products</h2>
          <button className="text-red-500">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {bestSelling.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow hover:scale-[1.02] transition-transform duration-300"
            >
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-red-500">${item.price}</span>
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(item.rating))}
                  {'☆'.repeat(5 - Math.floor(item.rating))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Music Experience Banner */}
      <div className="bg-black text-white rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Enhance Your Music Experience</h2>
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full">Shop Now</button>
          </div>
          <img src="/api/placeholder/300/300" alt="Speaker" className="w-64 h-64 object-contain" />
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