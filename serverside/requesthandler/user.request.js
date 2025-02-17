import userSchema from "../models/user.models.js"
import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken';
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "78c63a5635b05d",
        pass: "26927f0fcbce04",
    },
});

const {sign} = pkg; 


export async function adduser(req,res) {
    const{fname,lname,email,account,phone,password,cpassword}=req.body
    // if(!(fname&&phone&&lname&&email&&account&&password&&cpassword))
    //     return res.status(404).send({msg:"feilds are empty"});
    if(password!=cpassword)
        return res.status(404).send({msg:"password not match"});
    const data=await userSchema.findOne({email})
    if(data)
        return res.status(404).send({msg:"email already exists"});
    const hpasssword= await bcrypt.hash(password,10)
console.log(hpasssword);
await userSchema.create({fname,lname,email,account,phone,password:hpasssword}).then(()=>{
    return res.status(201).send({msg:"succesfully created"});

}).catch((error)=>{
    res.status(500).send({error})
})
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
    
        return res.status(200).json({ msg: "Successfully logged in", token });
    
      } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
      }
}


export async function forgetPassword(req,res) {
    console.log(req.body);
    
    try {
            // send mail with defined transport object
            const email=req.body.email
            const info = await transporter.sendMail({
            from: 'gihoso2129@owlny.com', // sender address
            to: email, // list of receivers
            subject: "verify", // Subject line
            text: "Hello world?", // plain text body
            html: "<a href='http://localhost:5173/userchaingepass  '><button>verify</button></a>", // html body
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

