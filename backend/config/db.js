import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://fjhvfjhv11:fjhv2005@cluster0.he7zt.mongodb.net/food-del").then(()=>console.log('DB connected'));
}