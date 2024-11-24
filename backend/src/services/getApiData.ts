import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

export async function getApiData(origin:string,destination:string){

    const api_url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    const API_KEY = process.env.GOOGLE_API_KEY || "Failed";

    let requestBody = {
        "origin":{
            "address":origin
        },
        "destination":{
            "address":destination
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "computeAlternativeRoutes": false,
        "routeModifiers": {
            "avoidTolls": false,
            "avoidHighways": false,
            "avoidFerries": false
        },
        "languageCode": "en-US",
        "units": "IMPERIAL"
    }

    let response = await fetch(api_url,{
        method:"POST",
        headers: {
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.legs",
            "Content-Type": "application/json",
            "X-Goog-Api-Key":API_KEY
        },
        body:JSON.stringify(requestBody)
    });

    return await response.json();    

}