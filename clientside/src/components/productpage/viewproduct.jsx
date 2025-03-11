import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import APIURL from '../path';
import Nav from "./nav"


const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [singleprod,setsingleprod]=useState({})
  const [cart,setcart]=useState()

  const { _id } = useParams();
  useEffect(()=>{
  async function showsingleproduct(e) {
    // e.prevenntdefault()
    try {
      // console.log(_id);
      const res = await axios.post(APIURL + "/showsingleproduct",{_id} );
      const {singleprod}=res.data
      // console.log(singleprod);
      setsingleprod(singleprod)
    } catch (error) {
      console.log(error);
    }
  }
  showsingleproduct()
  },[_id])

  // console.log(singleprod);

  
  // useEffect(()=>{
    async function checkcart() {
      try {
        console.log(_id);
        const user_id=localStorage.getItem("userId")
        const res=await axios.post(APIURL+"/checkcart",{_id,user_id})
        console.log(res.data);
        if (res.status==200) {
          setcart(true)
        }
        else{
          setcart(false)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    checkcart()
  // },[_id])


  async function addtocart(_id) {
    try {
      console.log(_id);
      const user_id=localStorage.getItem("userId")
      const res=await axios.post(APIURL+"/addtocart",{_id,user_id})
      if (res.status==201) {
          await checkcart();
          // setcart(true);
      }
      console.log(res.data);

    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
    <Nav>
      </Nav>
    <div className="max-w-7xl pt-18 mx-auto px-4">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 -mx-4">

      </div>

      {/* Navigation */}
      {/* <nav className="flex items-center justify-between py-4">
        <div className="text-xl font-bold">Exclusive</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">Contact</a>
          <a href="#" className="hover:text-red-500">About</a>
          <a href="#" className="hover:text-red-500">Sign Up</a>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="What are you looking for?"
            className="px-4 py-2 bg-gray-100 rounded-md"
          />
          <button className="hover:text-red-500">❤️</button>
          <button className="hover:text-red-500">🛒</button>
          <button className="hover:text-red-500">👤</button>
        </div>
      </nav> */}

      {/* Breadcrumb */}
      <div className="flex gap-2 text-gray-500 my-4">
        <span>Home</span>
        <span>/</span>
        <span>{singleprod.category}</span>
        <span>/</span>
        <span className="text-black">{singleprod.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
          {singleprod?.images?.length > 0 ? (
          singleprod.images.map((img, idx) => (
            <div 
              key={idx}
              className={`w-20 h-20 border rounded cursor-pointer ${selectedImage === idx ? 'border-red-500' : ''}`}
              onClick={() => setSelectedImage(idx)}
            >
              <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))
          ) : (
            <p>No images available</p>
          )}

          </div>
          <div className="flex-1">
            {singleprod?.images?.length > 0 && selectedImage !== null ? (
              <img 
                src={singleprod.images[selectedImage]} 
                alt="Main product view" 
                className="w-full rounded-lg" 
              />
            ) : (
              <p>No main image available</p>
            )}
          </div>

        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{singleprod.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">{'★'.repeat(4)}{'☆'.repeat(1)}</div>
            <span className="text-gray-500">({singleprod.stock})</span>
            <span className="text-green-500">{
              singleprod.quantity==0?"out of stock":
              "| In Stock:"}
              </span>
          </div>
          <div className="text-2xl font-semibold mb-4">{singleprod.price}</div>
          <p className="text-gray-600 mb-6">
          {singleprod.description}
          </p>
          {/* Size */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex gap-2">
            {singleprod?.sizes?.length > 0 ? (
                singleprod.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded ${size === '8' ? 'bg-red-500 text-white' : ''}`}
                  >
                    {size}   
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center border rounded">
              {cart? <button 
              className="px-4 py-2"
              onClick={() => addtocart(singleprod._id)}
              >
                add to cart
              </button>:
              <button 
              className="px-4 py-2"
              // onClick={() => addtocart(singleprod._id)}
              ><Link to={"/cart"}>
                go to cart
              </Link>
              </button>
              }
            </div>
            <button className="bg-red-500 text-white px-8 py-2 rounded">
              Buy Now
            </button>
            <button className="border border-red-500 p-2 rounded">
              ❤️
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl">🚚</span>
              <div>
                <h3 className="font-semibold">{singleprod.price>2000?"Free Delivery":"250 Delivery charge"}</h3>
                <p className="text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">↩️</span>
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <p className="text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      
    </div>
    </>
      
  );
};

export default ProductDetail;