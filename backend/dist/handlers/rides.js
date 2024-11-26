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
exports.getSortedRides = getSortedRides;
const getApiData_1 = require("../services/getApiData");
const getAvailableDrivers_1 = require("../services/getAvailableDrivers");
const rideSchema_1 = require("../schemas/rideSchema");
const mongoose_1 = __importDefault(require("mongoose"));
function getDistance(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, getApiData_1.getApiData)(req.body.origin, req.body.destination);
            const drivers = (0, getAvailableDrivers_1.getAvailableDrivers)(data.routes[0].distanceMeters);
            const originLocation = {
                latitude: data.routes[0].legs[0].startLocation.latLng.latitude,
                longitude: data.routes[0].legs[0].startLocation.latLng.longitude,
            };
            const destinationLocation = {
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
        }
        catch (error) {
            next();
        }
    });
}
function confirmRide(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Ride = mongoose_1.default.model("ride", rideSchema_1.rideSchema, "rides");
        const newRide = new Ride(req.body);
        yield newRide.save();
        res.status(200).json({ "success": true });
    });
}
function getSortedRides(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Ride = mongoose_1.default.model("ride", rideSchema_1.rideSchema, "rides");
        let rides;
        if (req.query.hasOwnProperty("driver_id")) {
            rides = yield Ride.find({ "customer_id": req.params.customer_id, "driver.id": req.query.driver_id }, { __v: 0, _id: 0 }).sort({ date: -1 });
        }
        else {
            rides = yield Ride.find({ "customer_id": req.params.customer_id }, { __v: 0, _id: 0 }).sort({ date: -1 });
        }
        if (rides.length == 0) {
            if (req.query.hasOwnProperty("driver_id")) {
                res.status(404).json({
                    "error_code": "NO_RIDES_FOUND",
                    "error_description": `There are no rides registered with a costumer id of ${req.params.customer_id} and a driver id of ${req.query.driver_id}`
                });
            }
            else {
                res.status(404).json({
                    "error_code": "NO_RIDES_FOUND",
                    "error_description": `There are no rides registered with the costume_id:${req.params.customer_id}`
                });
            }
        }
        else {
            res.status(200).json({
                "customer_id": req.params.customer_id,
                "rides": rides
            });
        }
    });
}
