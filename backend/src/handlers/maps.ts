import { Request, Response } from "express-serve-static-core";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

export async function getMapUrl(req:Request,res:Response){

    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue%7Clabel:O%7C${req.body.origin.latitude},${req.body.origin.longitude}&markers=color:blue%7Clabel:D%7C${req.body.destination.latitude},${req.body.destination.longitude}&path=enc:${encodeURIComponent(req.body.polyline)}&key=${process.env.GOOGLE_API_KEY}`;
    const imageUrlData = await fetch(imageUrl,{method:"POST"});
    const buffer = await imageUrlData.arrayBuffer();
    const stringifiedBuffer = Buffer.from(buffer).toString('base64');
    const contentType = imageUrlData.headers.get('content-type');
    res.status(200).json({"url":`data:${contentType};base64,${stringifiedBuffer}`});

};

