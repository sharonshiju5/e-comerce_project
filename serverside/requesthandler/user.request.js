import userSchema from "../models/user.models.js"
import addresSchema from "../models/addres.model.js"
import productSchema from "../models/product.model.js"
import cartSchema from "../models/cart.model.js"
import orderschema from "../models/order.model.js"

import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken';
import nodemailer from "nodemailer"
import mongoose from "mongoose";




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587 ,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "contacte169@gmail.com",
        pass: "ajviyfwmigdwdzxq",
    },
});

const {sign} = pkg; 


export async function adduser(req, res) {
    try {
        const { fname, lname, email, account, phone, password, cpassword, licence,company ,block=false} = req.body;
        console.log(licence);
        
        if (!(fname && lname && email && account && phone && password && cpassword)) {
            return res.status(400).send({ msg: "Fields are empty" });
        }
    
        if (password !== cpassword) {
            return res.status(400).send({ msg: "Passwords do not match" });
        }
    
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ msg: "Email already exists" }); // 409 for conflict
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        let sellerId = null;
        
        if (account === "seller") {
            let isUnique = false;
            while (!isUnique) {
                sellerId = "SELLER-" + Math.floor(100000 + Math.random() * 900000);
                const existingSeller = await userSchema.findOne({ sellerId });
                if (!existingSeller) isUnique = true;
            }
            await userSchema.create({ 
                fname, 
                lname, 
                email, 
                account, 
                phone, 
                password: hashedPassword, 
                sellerId, 
                licence, 
                company, 
                joiningDate: new Date(),
                block,
            });
        return res.status(201).send({ msg: "Successfully created", sellerId });

        }
        else{

            await userSchema.create({ 
                fname, 
                lname, 
                email, 
                account, 
                phone, 
                password: hashedPassword, 
                joiningDate: new Date(),
                block,
            });
        }


        return res.status(201).send({ msg: "Successfully created", });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
}


export async function logine(req,res){
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ msg: "Fields are empty" });
        }
    
        const user = await userSchema.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "Email is not valid" });
        }
    
        const success = await bcrypt.compare(password, user.password);
        console.log("Password Match:", success);
    
        if (!success) {
          return res.status(400).json({ msg: "Incorrect password" });
        }
    
        const token= await sign({userID:user._id},process.env.JWT_KEY,
          {expiresIn:"1m"})
        //   const userId = await userSchema.findOne({ email },{_id});
        if (user.block===true){

            return res.status(200).json({ msg: "you hav been blocked by the user"});
        }else{
            return res.status(200).json({ msg: "Successfully logged in", token,email,userId: user._id  });
        }
    
      } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
      }
}

export async function forgetPassword(req,res) {

    console.log(req.body);
    
    try {
            const email=req.body.email
            const info = await transporter.sendMail({
            from: 'contacte169@gmail.com', // sender address
            to: email, // list of receivers
            subject: "verify", // Subject line
            text: "Hello world?", // plain text body
            html: `<div style="padding: 20px; text-align: center;">
                <h2>Reset Your Password</h2>
                <p>Click the button below to reset your password:</p>
                <a href="http://localhost:5173/userchaingepass" 
                   style="background-color: #4CAF50; 
                          color: white; 
                          padding: 14px 20px; 
                          text-decoration: none; 
                          border-radius: 4px;
                          display: inline-block;
                          margin: 10px 0;">
                    Reset Password
                </a>
            </div>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
          
    } catch (error) {
        console.log(error);
        
    }
    
}


export async function chaingePassword(req,res) {
    try {

        const {email,password,cpassword}=req.body

        if (!email|| !password|| !cpassword) {

            return res.status(400).json({ msg: "Fields are empty" });

        }
        if (password !== cpassword) {

            return res.status(400).json({ msg: "Passwords do not match" });

        }
        const hashedPassword = await bcrypt.hash(password, 10);

            console.log("Hashed Password:", hashedPassword);

            const updatedUser = await userSchema.findOneAndUpdate(
            { email },{ password: hashedPassword }

        );
        if (!updatedUser) {

            return res.status(404).json({ msg: "User not found" });

          }
    return res.status(200).json({ msg: "Password changed successfully" });
        
    } catch (error) {
        console.log(error);
        
    }
}


// profile section
// profile section
// profile section
// profile section


export async function profile(req,res) {
    try {
        // console.log(res);

        const {email}=req.body

        console.log(email);

        const user = await userSchema.find({email});

        console.log(user);

        return res.status(200).json({ msg: "Successfully logged in",user });
        
            
    } catch (error) {
        console.log(error);

    }
}



export async function saveprofile(req,res) {
    try {
        // console.log(res);
        const {email,fname,lname,phone,}=req.body

        console.log(email);

        const user = await userSchema.findOneAndUpdate({email},{email,fname,lname,phone});

        console.log(user);

        return res.status(200).json({ msg: "Successfully updated in",user });
        
            
    } catch (error) {
        console.log(error);

    }
}


// address 
// address 
// address 

export async function addaddress(req, res) {
    try {
        const { userId, name, pincode, phone, locality, address, city, state, land, alternative } = req.body;

        if (!(userId && name && phone && pincode && locality && address && city && state)) {
            return res.status(400).send({ msg: "Fields are empty" });
        }

        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        await addresSchema.create({userId: user._id,userEmail: user.email, name,phone,pincode,locality,address,city,state,land,alternative});

        return res.status(201).send({ msg: "Successfully created" });

    } catch (error) {
        console.error(error);  
        res.status(500).send({ error });
    }
}


export async function showaddress(req,res) {
    try {
        const { userId} = req.body;
        console.log(userId);
        
        const address = await addresSchema.find({userId});
        console.log(address);
        
        return res.status(200).send({address});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

export async function deleteaddress(req,res) {
    try {
        const { _id} = req.body;
        console.log(_id);
        
        const addresses = await addresSchema.findOneAndDelete({_id}); 
           
             console.log(addresses);
        return res.status(201).send({ msg: "Successfully deleted",addresses });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}


//product section
//product section
//product section


export async function addProduct(req, res) {
    try {

        const { userId, name, brand, category, price, stock, sizes, images, material, description,block=true } = req.body;

        if (!userId) {
            return res.status(400).send({ msg: "User ID is required" });
        }

        const user = await userSchema.findById(userId);
        if (!user || !user.sellerId) {
            return res.status(404).send({ msg: "Seller ID not found for this user" });
        }
        const sellerId = user.sellerId; 


        if (!Array.isArray(images) || images.length === 0 || images.some(img => typeof img !== "string" || !img.trim())) {
            return res.status(400).send({ msg: "Invalid images field. Must be an array of image URLs." });
        }

        const newProduct = await productSchema.create({
            name,
            brand,
            category,
            price,
            stock,
            sizes,
            images,
            material,
            description,
            sellerId,
            block,
        });

        console.log("New Product Created:", newProduct); 

        return res.status(201).send({ msg: "Product successfully added", productId: newProduct._id });
    
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
}


export async function fetchProduct(req,res) {
    try {
        const{userId}=req.body
        const user = await userSchema.findById(userId);
        const sellerId = user.sellerId; 
        const products = await productSchema.find({ sellerId });
        return res.status(200).send({ msg: "Products fetched successfully", products });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
}

export async function deleteproduct(req,res) {
    try {
        const{productId}=req.body
        const product = await productSchema.findOneAndDelete({productId}); 
        // console.log(product);
        return res.status(201).send({ msg: "Successfully deleted", });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

export async function showproduct(req,res) {
    try {
        const {user_id}=req.body
        const _id=user_id
        console.log(user_id+"id is");
        
        const sellerId=await userSchema.findById(_id)
        if (sellerId) {
            console.log(sellerId+"seller");
            
            const Data = await productSchema.find({ sellerId: { $ne: sellerId.sellerId },block:false });
            return res.status(200).send({ msg: "Successfully fetched",Data})
        }
        else{
            const Data = await productSchema.find();
            return res.status(200).send({ msg: "Successfully fetched",Data})

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}


export async function updateproduct(req, res) {
    try {
        const { productid, name, brand, category, price, stock, sizes, images, material, description } = req.body;

        console.log("Received product ID:", productid);

        if (!productid || typeof productid !== "string") {
            return res.status(400).json({ error: "Invalid Product ID: ID is missing or not a string" });
        }

        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(400).json({ error: "Invalid Product ID format" });
        }

        const updatedProduct = await productSchema.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(productid) },{ name, brand, category, price, stock, sizes, images, material, description },

        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({ msg: "Product updated successfully", updatedProduct });
        
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function addoffer(req, res) {
    try {
        const { _id, offer } = req.body;

        if (!_id || offer === undefined) {
            return res.status(400).json({ error: "Product ID and offer are required" });
        }

        const updatedProduct = await productSchema.findOneAndUpdate({ _id },{$set:{offer:offer}},{new:true,runValidators:true});

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Updated Product:", updatedProduct);
        res.status(200).json({ msg: "Offer updated successfully", updatedProduct });
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function blockProduct(req,res) {
    try {
        const{_id}=req.body
        const updatedProduct = await productSchema.findOneAndUpdate(
            { _id },
            [{ $set: { block: { $not: "$block" } } }],
            { new: true } 
          );
          res.status(201).send({msg:"set product to block"})
    } catch (error) {
        console.log(error);
    }
}

export async function showsingleproduct(req,res) {
    try {
        const{_id}=req.body
        console.log(_id);
        const singleprod = await productSchema.findById(_id);
        console.log(singleprod);
         res.status(200).send({msg:"succesfully fetched single product",singleprod})
    } catch (error) {  
        console.log(error);
    
    }
}

export async function addtocart(req,res) {
    try {
        const{_id,user_id}=req.body
        console.log(_id,user_id);
     const cart=await cartSchema.create({
            product_id:_id,
            user_id:user_id
        })
        res.status(201).send({ msg: "succesfully added th item to cart" })
    } catch (error) {
        console.log(error);
        
    }
}

export async function checkcart(req,res) {
    try {
        const{_id,user_id}=req.body
        const product_id=_id
        console.log(product_id);
        const cart = await cartSchema.findOne({ product_id, user_id });
        console.log("Cart Item:", cart);       
         console.log(cart);
        if (cart) {
            return res.status(201).send({ msg: true }); 
        }
        else{
            return res.status(200).send({msg:false})
        }
    } catch (error) {
        console.log(error+"error in checkcart");
        return res.status(400).send(error)
        
    }
}


export async function showcart(req,res) {
    try {
        const { user_id } = req.body;
        console.log("User ID:", user_id);

        // Find all cart items for the user
        const cartItems = await cartSchema.find({ user_id });
        console.log("Cart Items:", cartItems);

        if (!cartItems.length) {
            return res.status(404).json({ message: "No products in cart" });
        }

        // Extract product IDs and convert them to ObjectId
        const productIds = cartItems.map(item => new mongoose.Types.ObjectId(item.product_id));

        // Fetch product details for all products in the cart
        const products = await productSchema.find({ _id: { $in: productIds } });

        console.log("Products in Cart:", products);
        return res.status(200).json(products);

    } catch (error) {
        console.error("Error in showcart:", error);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function removecart(req,res) {
    try {
        const{id}=req.body
        console.log(id);
        const product_id=id
        const product = await cartSchema.findOneAndDelete({product_id}); 
        return res.status(201).send({ msg: "Successfully deleted", });
        
    } catch (error) {
        console.log(error);
        
    }
}

// filter
// filter
// filter

export async function filter(req,res) {
    try {
        const{category}=req.body
        console.log(category);
        
        const product = await productSchema.find({category}); 
        console.log(product);
        
        return res.status(200).send({ msg: "Successfully fetched",product });
        
    } catch (error) {
        console.log(error);
        
    }
}


// order product
// order product
// order product



export async function buyproduct(req, res) {
    try {
        const { product, user_id } = req.body;

        // Check if any product is out of stock
        const outOfStock = product.some(item => item.stock === 0);
        if (outOfStock) {
            return res.status(400).send({ msg: "Out of stock" });
        }

        // Fetch user details
        const user = await userSchema.findById(user_id);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        for (const item of product) {
            const decreaseAmount = item.quantity ? Number(item.quantity) : 1; // Ensure it's a number

            // Find the product to check stock before updating
            const productData = await productSchema.findById(item._id);

            if (!productData || productData.stock < decreaseAmount) {
                return res.status(400).send({ msg: `Not enough stock for ${item.name}` });
            }

            // Update stock only if enough is available
            await productSchema.findByIdAndUpdate(
                item._id,
                { $inc: { stock: -decreaseAmount } },
                { new: true } // Ensures updated document is returned
            );
        }

        // Create order
        const order = await orderschema.create({
            products: product,
            userId: user._id,
            name: user.fname,
            email: user.email,
            phone: user.phone
        });

        return res.status(200).send({ msg: "Order successful", order });

    } catch (error) {
        console.error("❌ Error in buyproduct:", error);
        return res.status(500).send({ msg: "Internal server error", error: error.message });
    }
}
