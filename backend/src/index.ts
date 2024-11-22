import { Request, Response } from "express-serve-static-core";
import express from "express";
import ridesRouter from "./routes/rides"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/ride", ridesRouter);

const PORT = process.env.PORT || 8080;
const connectionString = "mongodb://127.0.0.1:27017/ridesDB"

mongoose.connect(connectionString).then( () =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, async () => {   
        console.log(`Server started on port ${PORT}`);
    });
});

