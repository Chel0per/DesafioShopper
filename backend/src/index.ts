import { Request, Response } from "express-serve-static-core";
import express from "express";
import ridesRouter from "./routes/rides"
import mapsRouter from "./routes/maps"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ride", ridesRouter);
app.use("/map", mapsRouter);

const PORT = process.env.PORT || 8080;
const connectionString = "mongodb://127.0.0.1:27017/ridesDB"

mongoose.connect(connectionString).then( () =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, async () => {   
        console.log(`Server started on port ${PORT}`);
    });
});

