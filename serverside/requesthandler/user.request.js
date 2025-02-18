import userSchema from "../models/user.models.js"
import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken';
import nodemailer from "nodemailer"

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


export async function adduser(req,res) {
    // const randomNumber = generateSixDigitNumber();
    const{fname,lname,email,account,phone,password,cpassword,otp}=req.body
    if(!(fname&&phone&&lname&&email&&account&&password&&cpassword))
        return res.status(404).send({msg:"feilds are empty"});
    // if(otp!=randomNumber)
    //     return res.status(404).send({msg:"otp is incorect"});
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
    
        return res.status(200).json({ msg: "Successfully logged in", token,email });
    
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