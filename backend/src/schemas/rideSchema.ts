import mongoose from "mongoose";

export const rideSchema = new mongoose.Schema({
    customer_id:String,
    origin:String,
    destination:String,
    distance:Number,
    duration:String,
    driver:{
        id:Number,
        name:String
    },
    value:String
});