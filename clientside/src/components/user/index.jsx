import "../css/index.css"
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';




export default function HomePage({useremail}) {


    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
      { name: 'Home', href: '#' },
      { name: 'Products', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' }
    ];
    return(
        <>
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600 cursor-pointer">
              Logo
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <input type="text" className="hide-input"/>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <User className="h-5 w-5 text-gray-600" />
            </button>
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-4 px-3 pt-4 border-t">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
        </>
    )
}