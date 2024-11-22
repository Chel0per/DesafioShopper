import { Request, Response } from "express-serve-static-core";
import express from "express";
import ridesRouter from "./routes/rides"
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/ride", ridesRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {   
    console.log(`Server started on port ${PORT}`);
});

app.get("/", function (req:Request,res:Response){

    res.send({status:"This definitelly is an API"})

})
