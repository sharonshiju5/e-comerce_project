import React, { useEffect, useState } from "react";
import { Image, Images } from "lucide-react";
import axios from "axios";
import APIURL from "../path";
import { ToastContainer, toast } from 'react-toastify';

const Editproduct = (productid) => {
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        sizes: [],
        images: [],
        material: "100% Cotton",
        description: "",
        productid: "",
    });

    useEffect(() => {
        try {
            if (productid?.prodId) {
                setProduct({ 
                    ...productid.prodId, 
                    name: productid.prodId.name || "",
                    brand: productid.prodId.brand || "",
                    category: productid.prodId.category || "",
                    price: productid.prodId.price || "",
                    stock: productid.prodId.stock || "",
                    sizes: productid.prodId.sizes || [],
                    images: productid.prodId.images || [],
                    material: productid.prodId.material || "100% Cotton",
                    description: productid.prodId.description || "",
                    productid: productid.prodId._id || "", 
                });
            }
        } catch (error) {
            console.error("Error setting product data:", error);
            toast.error("Failed to load product data");
        }
    }, [productid]);

    const [categories] = useState(["Beach Towels", "Bath Towels", "Tea Towels"]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [customSize, setCustomSize] = useState("");
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        try {
            setProduct({ ...product, [e.target.name]: e.target.value });
        } catch (error) {
            console.error("Error updating product field:", error);
            toast.error("Failed to update field");
        }
    };

    const toggleSelection = (list, setList, value) => {
        try {
            setList((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
        } catch (error) {
            console.error("Error toggling selection:", error);
            toast.error("Failed to update selection");
        }
    };

    const handleImageUpload = (e) => {
        try {
            const files = Array.from(e.target.files);
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...previews]);

            const imageUrls = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    try {
                        imageUrls.push(reader.result);
                        setProduct(prev => ({ ...prev, images: [...prev.images, reader.result] }));
                    } catch (error) {
                        console.error("Error processing image:", error);
                        toast.error("Failed to process image");
                    }
                };
                reader.onerror = () => {
                    throw new Error("Failed to read file");
                };
            });
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images");
        }
    };

    const addCustomSize = () => {
        try {
            if (!customSize.trim()) return;
            setProduct(prev => ({...prev, sizes: [...prev.sizes, customSize] }));
            setCustomSize("");
        } catch (error) {
            console.error("Error adding custom size:", error);
            toast.error("Failed to add custom size");
        }
    };

    const addProducts = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = { ...product, productid };
            const res = await axios.post(APIURL + "/updateproduct", updatedProduct);

            if (res.status === 201) {
                toast.success(res.data.msg);
                setProduct({
                    name: "",
                    brand: "",
                    category: "",
                    price: "",
                    stock: "",
                    sizes: [],
                    images: [],
                    material: "100% Cotton",
                    description: "",
                    userId: "",
                });
                setImagePreviews([]);
                setSelectedSizes([]);
                setCustomSize("");
            }
        } catch (error) {
            console.error("Error saving product:", error.response?.data || error.message);
            toast.error("Failed to save product");
        }
    };

    const removeImage = (index) => {
        try {
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error removing image preview:", error);
            toast.error("Failed to remove image preview");
        }
    };

    const remImage = (index) => {
        try {
            setProduct((prevProduct) => ({
                ...prevProduct,
                images: prevProduct.images.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error("Error removing product image:", error);
            toast.error("Failed to remove image");
        }
    };

    return (
        <div className="w-full p-8 bg-white">
            <form onSubmit={addProducts}>
                <h2 className="text-xl font-bold text-blue-600">Product Information</h2>
                <input type="text" name="name" placeholder="Product Name" className="border p-2 rounded w-full mt-2" value={product.name} onChange={handleChange} />
                <input type="text" name="brand" placeholder="Brand" className="border p-2 rounded w-full mt-2" value={product.brand} onChange={handleChange} />
                <div className="flex flex-col w-full space-y-2">
                    <select
                        name="category"
                        className="border p-2 rounded w-full mt-2"
                        value={product.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border p-2 rounded w-full mt-2 h-32 resize-none"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>

                <h3 className="text-lg font-semibold text-blue-600 mt-6">Upload Product Images</h3>
                <label className="border-2 border-gray-300 border-dashed p-6 w-full flex flex-col items-center justify-center cursor-pointer">
                    <Image className="h-10 w-10 text-gray-500" />
                    <span className="text-gray-500 mt-2">Browse Or Desktop</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {product.images && product.images.length > 0 && (
                        product.images.map((imgSrc, index) => (
                            <div key={index} className="relative group">
                                <img key={index} src={imgSrc} alt={`Product Image ${index}`} className="w-full h-24 object-cover rounded" />
                                <button
                                    onClick={() => remImage(index)}
                                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                    {imagePreviews.map((src, index) => (
                        <div key={index} className="relative group">
                            <img src={src} alt="Uploaded preview" className="w-full h-24 object-cover rounded" />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <h3 className="text-lg font-semibold text-blue-600 mt-6">Product Variants</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold">Sizes</h4>
                        <div className="flex mt-2">
                            <input
                                type="text"
                                name="size"
                                placeholder="Custom Size"
                                className="border p-2 rounded w-full"
                                value={customSize}
                                onChange={(e) => setCustomSize(e.target.value)}
                            />
                            <button type="button" onClick={addCustomSize} className="bg-blue-500 text-white p-2 ml-2 rounded">
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-blue-600 mt-6">Pricing & Stock</h3>
                <input type="number" name="price" placeholder="Price" className="border p-2 rounded w-full mt-2" value={product.price} onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" className="border p-2 rounded w-full mt-2" value={product.stock} onChange={handleChange} />

                <div className="flex justify-between mt-6">
                    <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded">Cancel</button>
                    <div className="flex space-x-4">
                        <button className="border border-gray-500 px-4 py-2 rounded">Draft</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Editproduct;