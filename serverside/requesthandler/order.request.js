import userSchema from "../models/user.models.js"
import addresSchema from "../models/addres.model.js"
import productSchema from "../models/product.model.js"
import cartSchema from "../models/cart.model.js"
import orderschema from "../models/order.model.js"
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

export async function buyproduct(req, res) {
    try {
        const { product, user_id } = req.body;
        console.log("Received products:", product);

        if (!Array.isArray(product) || product.length === 0 || !user_id) {
            return res.status(400).send({ msg: "Invalid request format" });
        }

        // Fetch address
        const address = await addresSchema.find({ userId: user_id });
        console.log(address);
        
        if (!address || address.length === 0) {
            return res.status(404).send({ msg: "Address not found" });
        }

        // Fetch user
        const user = await userSchema.findById(user_id);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        for (const item of product) {
            const productData = await productSchema.findById(item._id);

            if (!productData) {
                return res.status(400).send({ msg: `Product ${item.name} not found` });
            }

            const decreaseAmount = item.quantity ? Number(item.quantity) : 1;

            if (productData.stock < decreaseAmount) {
                return res.status(400).send({ msg: `Not enough stock for ${item.name}` });
            }
        }

        for (const item of product) {
            await productSchema.findByIdAndUpdate(
                item._id,
                { $inc: { stock: -Number(item.quantity || 1) } },
                { new: true }
            );
        }

        const orderDate = new Date();
        const estimateDate = new Date(orderDate);
        estimateDate.setDate(orderDate.getDate() + 10);

        const order = await orderschema.create({
            products: product,
            userId: user._id,
            name: user.fname,
            email: user.email,
            phone: user.phone,
            orderDate: orderDate,
            address: address[0], 
            estimateDate: estimateDate 
        });
        await cartSchema.deleteMany({ user_id });
        const email = user.email;
        const info = await transporter.sendMail({
            from: 'contacte169@gmail.com',
            to: email,
            subject: "Order Confirmation #" + order._id.toString().slice(-6),
            text: "Your order has been confirmed.",
            html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
                    <h2 style="color: #333; margin-bottom: 5px;">Order Confirmation</h2>
                    <p style="color: #777; font-size: 14px;">Order #${order._id.toString().slice(-6)}</p>
                </div>
                
                <div style="padding: 20px 0;">
                    <p>Dear ${user.fname},</p>
                    <p>Thank you for your order. We're pleased to confirm that your order has been received and is being processed.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                        <p style="margin: 0; font-weight: bold;">Estimated Delivery Date:</p>
                        <p style="margin: 5px 0 0;">${estimateDate.toDateString()}</p>
                    </div>
                </div>
                
                <div style="border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; padding: 15px 0;">
                    <h3 style="margin-top: 0;">Order Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <th style="text-align: left; padding: 8px 0;">Product</th>
                            <th style="text-align: center; padding: 8px 0;">Quantity</th>
                            <th style="text-align: right; padding: 8px 0;">Price</th>
                        </tr>
                        
                        ${product.map(item => `
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 12px 0;">${item.name}</td>
                            <td style="text-align: center; padding: 12px 0;">${item.quantity || 1}</td>
                            <td style="text-align: right; padding: 12px 0;">₹${item.price}</td>
                        </tr>
                        `).join('')}
                        
                        <tr>
                            <td colspan="2" style="text-align: right; padding-top: 15px; font-weight: bold;">Total:</td>
                            <td style="text-align: right; padding-top: 15px; font-weight: bold;">₹${product.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="padding: 20px 0;">
                    <h3>Shipping Address</h3>
                    <p style="margin: 5px 0;">${address[0].name || user.fname}</p>
                    <p style="margin: 5px 0;">${address[0].street}, ${address[0].city}</p>
                    <p style="margin: 5px 0;">${address[0].state}, ${address[0].city} - ${address[0].pincode}</p>
                    <p style="margin: 5px 0;">Phone: ${user.phone}</p>
                </div>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
                    <p style="margin: 0; font-size: 14px;">If you have any questions about your order, please contact our customer service at <a href="mailto:support@yourstore.com" style="color: #4a90e2;">support@yourstore.com</a></p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0; color: #999; font-size: 12px;">
                    <p>© 2025 Your Store Name. All rights reserved.</p>
                </div>
            </div>
            `
        });

        return res.status(200).send({ msg: "Order successful", order });

    } catch (error) {
        console.error("❌ Error in buyproduct:", error);
        return res.status(500).send({ msg: "net work issue", error: error.message });
    }
}



export async function orderdetails(req,res) {
    try {
        
        const{userId}=req.body
        console.log(userId);
        const prod=await orderschema.find({userId})
        
        res.status(200).send({msg:"ordered product are",prod})
    } catch (error) {
     console.log(error);
        
    }
}
