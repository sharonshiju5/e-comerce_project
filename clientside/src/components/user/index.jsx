import "../css/index.css"
import { useState } from 'react';
import { Menu,Store ,Filter , X, Search, ShoppingCart, User, LogOut, Settings, Heart } from 'lucide-react';




export default function HomePage({useremail}) {
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
      { name: 'My Profile', icon: User },
      { name: 'Settings', icon: Settings },
      { name: 'Wishlist', icon: Heart },
      { name: 'Logout', icon: LogOut }
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
                    <a
                      key={item.name}
                      href="#"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200
                        ${index === profileMenuItems.length - 1 ? 'border-t border-gray-100' : ''}`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </a>
                  ))}
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
      
    </div>
        </>
    )
}