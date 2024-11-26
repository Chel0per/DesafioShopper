import mongoose from "mongoose";
import { Counter } from "../models/Counter";

export const rideSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    customer_id:String,
    origin:String,
    destination:String,
    date: {
        type: Date,
        default: () => new Date(Date.now())
    },
    distance:Number,
    duration:String,
    driver:{
        id:Number,
        name:String
    },
    value:Number
});

rideSchema.pre("save", async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "ride" },
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true } 
        );

            this.id = counter.seq; 
            next();
    } else {
        next();
    }
});
