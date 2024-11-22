import { Location } from "./Location";
import { Driver } from "./Driver";

export interface estimateSuccessResponseBody {
    "origin":Location,
    "destination":Location,
    "distance":number,
    "duration":string,
    "options":Driver[],
    "routeResponse":any
}