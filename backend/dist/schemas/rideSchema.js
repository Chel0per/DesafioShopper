"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.rideSchema = new mongoose_1.default.Schema({
    customer_id: String,
    origin: String,
    destination: String,
    distance: Number,
    duration: String,
    driver: {
        id: Number,
        name: String
    },
    value: String
});
