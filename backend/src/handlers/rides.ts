import { Request, Response } from "express-serve-static-core";
import { estimateRequestBody } from "../types/estimateRequestBody";
import { estimateSuccessResponseBody } from "../types/estimateSuccesResponseBody";
import { getApiData } from "../services/getApiData";
import { getDrivers } from "../services/getDrivers";
import { Driver } from "../types/Driver";
import { Location } from "../types/Location";

export async function getDistance(req:Request<{},{},estimateRequestBody>,res:Response<estimateSuccessResponseBody>){
    
    const data = await getApiData(req.body.origin,req.body.destination);
    
    const drivers:Driver[] = getDrivers(data.routes[0].distanceMeters);

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

export async function confirmRide(req:Request,res:Response){

}