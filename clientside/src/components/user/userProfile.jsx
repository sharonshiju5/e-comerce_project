import React, { useState } from "react";
import {  Package,  MapPin, Plus, Edit2 } from "lucide-react";
import "../css/index.css"
import { Link,useNavigate } from "react-router-dom";
import { Menu,Store ,Filter , X, Search, ShoppingCart, User, LogOut, Settings, Heart,  } from 'lucide-react';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, Country",
  };


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

  return (
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
    <div className="main-container">
    <div className="flex h-full w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white p-5 shadow-md flex flex-col space-y-3">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>
        <button className={`p-3 rounded-md flex items-center space-x-2 ${activeTab === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab("profile")}>
          <User /> <span>Personal Info</span>
        </button>
        <button className={`p-3 rounded-md flex items-center space-x-2 ${activeTab === "orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab("orders")}>
          <Package /> <span>My Orders</span>
        </button>
        <button className={`p-3 rounded-md flex items-center space-x-2 ${activeTab === "wishlist" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab("wishlist")}>
          <Heart /> <span>Wishlist</span>
        </button>
        <button className={`p-3 rounded-md flex items-center space-x-2 ${activeTab === "addresses" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab("addresses")}>
          <MapPin /> <span>Addresses</span>
        </button>
        <button className={`p-3 rounded-md flex items-center space-x-2 ${activeTab === "addProduct" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} onClick={() => setActiveTab("addProduct")}>
           <span>view Products</span>
        </button>
        <button className="mt-auto p-3 rounded-md flex items-center space-x-2 text-red-600 hover:bg-red-100">
          <LogOut /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "profile" && (
            <section className="bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                <Edit2 className="mr-2" /> Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Address:</strong> {userData.address}</p>
            </div>
          </section>
        )}
        {activeTab === "orders" && (
          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Order History</h2>
            <p>No recent orders</p>
          </section>
        )}
        {activeTab === "wishlist" && (
          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Wishlist</h2>
            <p>No saved items</p>
          </section>
        )}
        {activeTab === "addresses" && (
          <section className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Saved Addresses</h2>
            <p>No addresses saved</p>
          </section>
        )}
        {activeTab === "addProduct" && (
            <section className="bg-white p-6 rounded-md shadow-md">
            <button><Plus /></button>
            <h2 className="text-lg font-semibold">Add New Product</h2>
            <p>Form goes here</p>
          </section>
        )}
      </main>
    </div>
        </div>
    </>
  );
};

export default ProfilePage;
