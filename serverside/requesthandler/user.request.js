import userSchema from "../models/user.models.js"
import addresSchema from "../models/addres.model.js"
import productSchema from "../models/product.model.js"
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
        const { fname, lname, email, account, phone, password, cpassword, licence,company} = req.body;
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
                sellerId = "SELLER-" + Math.floor(100000 + Math.random() * 900000); // Example: SELLER-654321
                const existingSeller = await userSchema.findOne({ sellerId });
                if (!existingSeller) isUnique = true;
            }
        }
    
        // Create the user
        await userSchema.create({ fname, lname, email, account, phone, password: hashedPassword, sellerId ,licence,company});
    
        return res.status(201).send({ msg: "Successfully created", sellerId });
    
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
          {expiresIn:"24h"})
        //   const userId = await userSchema.findOne({ email },{_id});
    
        return res.status(200).json({ msg: "Successfully logged in", token,email,userId: user._id  });
    
      } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
      }
}

// function generateSixDigitNumber() {
//     return Math.floor(100000 + Math.random() * 900000);
// }

export async function forgetPassword(req,res) {

    console.log(req.body);
    
    try {
        // const randomNumber = generateSixDigitNumber();
            // send mail with defined transport object
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

        const { userId, name, brand, category, price, stock, sizes, images, material, description } = req.body;

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
        const Data = await productSchema.find(); 
        return res.status(200).send({ msg: "Successfully fetched",Data})
        
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

        const updatedProduct = await productSchema.findOneAndUpdate(
            { _id },
            { $set: { offer: offer } },  // Use $set to explicitly update the field
            { new: true, runValidators: true } // Ensures updated document is returned & validates schema
        );

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