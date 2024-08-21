import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import axios from 'axios'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";

    try {
        // Create and save the new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery charges, ensuring it meets the minimum amount requirement
        const deliveryCharge = req.body.amount > 499 ? 0 : Math.max(39 * 100, 50 * 100);
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges",
                },
                unit_amount: deliveryCharge,
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log("Error in placeOrder:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment confirmed" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment not confirmed" });
        }
    } catch (error) {
        console.log("Error in verifyOrder:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// listing orders for admin pannel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Status updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };