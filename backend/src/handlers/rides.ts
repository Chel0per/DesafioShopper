import { Request, Response , NextFunction } from "express-serve-static-core";
import { EstimateRequestBody } from "../types/EstimateRequestBody";
import { EstimateSuccessResponseBody } from "../types/EstimateSuccessResponseBody";
import { getApiData } from "../services/getApiData";
import { getAvailableDrivers } from "../services/getAvailableDrivers";
import { Driver } from "../types/Driver";
import { Location } from "../types/Location";
import { ConfirmRequestBody } from "../types/ConfirmRequestBody";
import { rideSchema } from "../schemas/rideSchema";
import mongoose from "mongoose";

export async function getDistance(req: Request<{}, {}, EstimateRequestBody>,res: Response<EstimateSuccessResponseBody>,next: NextFunction) {
    
    try {

        const data = await getApiData(req.body.origin, req.body.destination);

        const drivers: Driver[] = getAvailableDrivers(data.routes[0].distanceMeters);

        const originLocation: Location = {
            latitude: data.routes[0].legs[0].startLocation.latLng.latitude,
            longitude: data.routes[0].legs[0].startLocation.latLng.longitude,
        };
        const destinationLocation: Location = {
            latitude: data.routes[0].legs[0].endLocation.latLng.latitude,
            longitude: data.routes[0].legs[0].endLocation.latLng.longitude,
        };

        res.status(200).json({
            origin: originLocation,
            destination: destinationLocation,
            distance: data.routes[0].distanceMeters,
            duration: data.routes[0].duration,
            options: drivers,
            routeResponse: data,
        });

    } catch (error: any) {

        next();

    }
}

export async function confirmRide(req:Request<{},{},ConfirmRequestBody>,res:Response){

    const Ride = mongoose.model("ride",rideSchema,"rides");
    const newRide = new Ride(req.body);

    await newRide.save();
    
    res.status(200).json({"success":true});

}

export async function getSortedRides(req:Request,res:Response){

    const Ride = mongoose.model("ride",rideSchema,"rides");
    let rides;

    if(req.query.hasOwnProperty("driver_id")){
        rides = await Ride.find({"customer_id":req.params.customer_id,"driver.id":req.query.driver_id},{__v:0,_id:0,customer_id:0}).sort({ date: -1 });
    }
    else{
        rides = await Ride.find({"customer_id":req.params.customer_id},{__v:0,_id:0,customer_id:0}).sort({ date: -1 });
    }

    if (rides.length == 0){
        if(req.query.hasOwnProperty("driver_id")){
            res.status(404).json({
                "error_code":"NO_RIDES_FOUND",
                "error_description":`There are no rides registered with a costumer id of ${req.params.customer_id} and a driver id of ${req.query.driver_id}`
            })
        }
        else{
            res.status(404).json({
                "error_code":"NO_RIDES_FOUND",
                "error_description":`There are no rides registered with the costume_id:${req.params.customer_id}`
            })
        }
    }
    else{
        res.status(200).json({
            "customer_id":req.params.customer_id,
            "rides":rides
        })
    }   
}