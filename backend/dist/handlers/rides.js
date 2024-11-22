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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = getDistance;
exports.confirmRide = confirmRide;
const getApiData_1 = require("../services/getApiData");
const getAvailableDrivers_1 = require("../services/getAvailableDrivers");
const rideSchema_1 = require("../schemas/rideSchema");
const mongoose_1 = __importDefault(require("mongoose"));
function getDistance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, getApiData_1.getApiData)(req.body.origin, req.body.destination);
        const drivers = (0, getAvailableDrivers_1.getAvailableDrivers)(data.routes[0].distanceMeters);
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
            "duration": data.routes[0].duration,
            "options": drivers,
            "routeResponse": data
        });
    });
}
;
function confirmRide(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Ride = mongoose_1.default.model("ride", rideSchema_1.rideSchema, "rides");
        const newRide = new Ride(req.body);
        yield newRide.save();
        res.status(200).json({ "success": true });
    });
}
