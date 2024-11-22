"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = getDistance;
exports.confirmRide = confirmRide;
const getApiData_1 = require("../services/getApiData");
const getDrivers_1 = require("../services/getDrivers");
function getDistance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, getApiData_1.getApiData)(req.body.origin, req.body.destination);
        const drivers = (0, getDrivers_1.getDrivers)(data.routes[0].distanceMeters);
        const originLocation = {
            "latitude": data.routes[0].legs[0].startLocation.latLng.latitude,
            "longitude": data.routes[0].legs[0].startLocation.latLng.longitude
        };
        const destinationLocation = {
            "latitude": data.routes[0].legs[0].endLocation.latLng.latitude,
            "longitude": data.routes[0].legs[0].endLocation.latLng.longitude
        };
        res.status(200).json({
            "origin": originLocation,
            "destination": destinationLocation,
            "distance": data.routes[0].distanceMeters,
            "duration": data.routes[0].distanceMeters.duration,
            "options": drivers,
            "routeResponse": data
        });
    });
}
;
function confirmRide(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
