import { useEffect, useState } from "react";
import axios from "axios";
import APIURL from "../path";
import { ToastContainer, toast } from 'react-toastify';
import Editproduct from "./editproduct";

const SellerProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(true);
    const [productid, setProductid] = useState("");
    
    const userId = localStorage.getItem("userId"); 
    

    useEffect(() => {
        if (!userId) {
            setError("Seller ID not found. Please log in.");
            setLoading(false);
            return;
        }
        async function fetchproduct(params) {
            try {
                const res = await axios.post(APIURL + "/fetchproduct", {userId})
                console.log(res);
                const {products}=res.data
                console.log(products);
                setProducts(products)
            } catch (error) {
                
            }
        }
        fetchproduct()
    }, [userId]);


    async function deleteProduct(productId) {
        try {
            const res = await axios.post(APIURL + "/deleteproduct", productId)
            const{msg}=res.data
            console.log(res);
            console.log(msg);
            
            if (res.status==201) {
              toast.success(msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(() => {
                  fetchProduct()
                }, 2500);
            }
            
        } catch (error) {
            
        }
    }


    function showeditproduct(prodId){
        setProductid(prodId)
        setShow(false)
    }
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>

            {/* {loading && <p>Loading products...</p>} */}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && products.length === 0 && <p>No products found.</p>}
            {/* {
            show? */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-lg">
                        <img 
                            src={product.images?.[0] || "https://via.placeholder.com/150"} 
                            alt={product.name} 
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="font-bold mt-2">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        <div onClick={() => {
                                    const prodId = product;
                                    console.log("Address ID to delete:", prodId);
                                    showeditproduct(prodId);
                                }} className="mt-3 flex justify-end gap-2"> 
                            <a href="#edit"> 
                            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit 
                            </button>
                            </a> 

                            <button
                                onClick={() => {
                                    const productId = product._id;
                                    console.log("Address ID to delete:", productId);
                                    deleteProduct(productId);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                </svg>
                                Delete
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
             {/* :""} */}
      <ToastContainer />
            {
            show?"":
            <div id="edit">
                <button>cancel</button>
            <Editproduct prodId={productid}/>
            </div>
            }
        </div>
    );
};

export default SellerProducts;
