import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  Ban, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react';
import APIURL from '../path';
import axios from 'axios';

const AdminPanel = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('users');
  
  // Mock data for demonstration
  const [users, setUsers] = useState([]);
  
  const [sellers, setSellers] = useState([
    { id: 101, name: 'Fashion Outlet', email: 'contact@fashionoutlet.com', status: 'active', products: 45, sales: 230, rating: 4.7 },
    { id: 102, name: 'Shoe Heaven', email: 'info@shoeheaven.com', status: 'active', products: 78, sales: 456, rating: 4.5 },
    { id: 103, name: 'Dress Elegance', email: 'support@dresselegance.com', status: 'pending', products: 62, sales: 189, rating: 4.2 },
    { id: 104, name: 'Stylist Corner', email: 'hello@stylistcorner.com', status: 'active', products: 93, sales: 321, rating: 4.8 },
  ]);
  
  const [products, setProducts] = useState([
    { id: 1001, name: 'Casual Running Shoes', seller: 'Shoe Heaven', category: 'Shoes', stock: 45, price: 89.99, status: 'active' },
    { id: 1002, name: 'Evening Gown', seller: 'Dress Elegance', category: 'Dresses', stock: 12, price: 199.99, status: 'active' },
    { id: 1003, name: 'Summer Sandals', seller: 'Shoe Heaven', category: 'Shoes', stock: 28, price: 49.99, status: 'active' },
    { id: 1004, name: 'Cocktail Dress', seller: 'Fashion Outlet', category: 'Dresses', stock: 7, price: 129.99, status: 'active' },
    { id: 1005, name: 'Leather Boots', seller: 'Shoe Heaven', category: 'Shoes', stock: 0, price: 159.99, status: 'out_of_stock' },
  ]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Block/unblock user function
  const toggleBlockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === 'active' ? 'blocked' : 'active'} 
        : user
    ));
  };
  
  // Filtered data based on search term
  const filteredUsers = users.filter(user => 
    user.fname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const admintoken=localStorage.getItem("admintoken")
  useEffect(()=>{

    async function findUsers() {
      try {
        const res = await axios.get(APIURL + "/showusers");
        console.log(res);
        const{users}=res.data
        setUsers(users)
      } catch (error) {
        console.log(error);
        
      }
    }
    findUsers()
  },[admintoken])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed the duplicated sidebar issue */}
      <div className="w-64 bg-white shadow-md ">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <div
            className={`flex items-center w-64 px-6 py-3 cursor-pointer ${
              activeTab === 'users'
                ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Users</span>
          </div>
          <div
            className={`flex items-center  w-64  px-6 py-3 cursor-pointer ${
              activeTab === 'sellers'
                ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('sellers')}
          >
            <Store className="w-5 h-5 mr-3" />
            <span>Sellers</span>
          </div>
          <div
            className={`flex items-center  w-64  px-6 py-3 cursor-pointer ${
              activeTab === 'products'
                ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('products')}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            <span>Products</span>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'sellers' && 'Seller Management'}
              {activeTab === 'products' && 'Product Management'}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-6">
          {/* Action Bar */}
          {/* <div className="flex justify-between mb-6">
            <div className="flex space-x-2">
              <div className="bg-white p-2 rounded shadow-sm cursor-pointer">
                <Filter className="w-4 h-4 text-gray-500" />
              </div>
              <select className="bg-white py-2 px-3 rounded shadow-sm border-none text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Filter by Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div> */}
          
          {/* Tables */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name/Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className={user.status === 'blocked' ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Active' : 'Blocked'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.account}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joiningDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            className={`p-1 rounded ${user.status === 'active' ? 'text-red-600 hover:bg-red-100' : 'text-green-600 hover:bg-green-100'}`}
                            onClick={() => toggleBlockUser(user.id)}
                            title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-blue-600 hover:bg-blue-100" title="Edit User">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="More Options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching your search criteria.</p>
                </div>
              )}
              
              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        1
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'sellers' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller/Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSellers.map((seller) => (
                    <tr key={seller.id} className={seller.status === 'pending' ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{seller.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                        <div className="text-sm text-gray-500">{seller.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          seller.status === 'active' ? 'bg-green-100 text-green-800' : 
                          seller.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {seller.status === 'active' ? 'Active' : seller.status === 'pending' ? 'Pending' : 'Blocked'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {seller.products}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {seller.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-1">{seller.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="p-1 rounded text-blue-600 hover:bg-blue-100" title="Edit Seller">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-red-600 hover:bg-red-100" title="Block Seller">
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="More Options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSellers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No sellers found matching your search criteria.</p>
                </div>
              )}
              
              {/* Pagination for sellers (similar to users) */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSellers.length}</span> of <span className="font-medium">{sellers.length}</span> results
                    </p>
                  </div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={product.status === 'out_of_stock' ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.seller}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="p-1 rounded text-blue-600 hover:bg-blue-100" title="Edit Product">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-red-600 hover:bg-red-100" title="Delete Product">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="More Options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found matching your search criteria.</p>
                </div>
              )}
              
              {/* Pagination for products (similar to users) */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> results
                    </p>
                  </div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;