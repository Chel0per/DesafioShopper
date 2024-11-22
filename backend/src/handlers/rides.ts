import { Request, Response } from "express-serve-static-core";
import { EstimateRequestBody } from "../types/EstimateRequestBody";
import { EstimateSuccessResponseBody } from "../types/EstimateSuccessResponseBody";
import { getApiData } from "../services/getApiData";
import { getAvailableDrivers } from "../services/getAvailableDrivers";
import { Driver } from "../types/Driver";
import { Location } from "../types/Location";
import { ConfirmRequestBody } from "../types/ConfirmRequestBody";
import { rideSchema } from "../schemas/rideSchema";
import mongoose from "mongoose";

export async function getDistance(req:Request<{},{},EstimateRequestBody>,res:Response<EstimateSuccessResponseBody>){
    
    const data = await getApiData(req.body.origin,req.body.destination);
    
    const drivers:Driver[] = getAvailableDrivers(data.routes[0].distanceMeters);

    const originLocation:Location = {
        "latitude":data.routes[0].legs[0].startLocation.latLng.latitude,
        "longitude":data.routes[0].legs[0].startLocation.latLng.longitude
    }

    const destinationLocation:Location = {
        "latitude":data.routes[0].legs[0].endLocation.latLng.latitude,
        "longitude":data.routes[0].legs[0].endLocation.latLng.longitude
    }

    res.status(200).json({
        "origin":originLocation,
        "destination":destinationLocation,
        "distance":data.routes[0].distanceMeters,
        "duration":data.routes[0].duration,
        "options":drivers,
        "routeResponse":data
    })
    
};

export async function confirmRide(req:Request<{},{},ConfirmRequestBody>,res:Response){

    const Ride = mongoose.model("ride",rideSchema,"rides");
    const newRide = new Ride(req.body);

    await newRide.save();
    
    res.status(200).json({"success":true});

}