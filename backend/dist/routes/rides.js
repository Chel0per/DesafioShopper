"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rides_1 = require("../handlers/rides");
const generateErrorString_1 = require("../services/generateErrorString");
const driverExistById_1 = require("../services/driverExistById");
const checkMinDistance_1 = require("../services/checkMinDistance");
const ridesRouter = (0, express_1.Router)();
ridesRouter.post('/estimate', [
    (0, express_validator_1.body)("customer_id")
        .notEmpty()
        .withMessage("Customer Id is required."),
    (0, express_validator_1.body)("origin")
        .notEmpty()
        .withMessage("Origin is required."),
    (0, express_validator_1.body)("destination")
        .notEmpty()
        .withMessage("Destination is required.")
        .custom((value, { req }) => {
        if (value === req.body.origin) {
            throw new Error("Origin and destination must be different.");
        }
        return true;
    })
], (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: (0, generateErrorString_1.generateErrorString)(errors)
        });
    }
    else {
        next();
    }
}, rides_1.getDistance);
ridesRouter.patch('/confirm', [
    (0, express_validator_1.body)("customer_id")
        .notEmpty()
        .withMessage("Customer Id is required."),
    (0, express_validator_1.body)("origin")
        .notEmpty()
        .withMessage("Origin is required."),
    (0, express_validator_1.body)("destination")
        .notEmpty()
        .withMessage("Destination is required.")
        .custom((value, { req }) => {
        if (value === req.body.origin) {
            throw new Error("Origin and destination must be different.");
        }
        return true;
    })
], (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        next();
    else {
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: (0, generateErrorString_1.generateErrorString)(errors)
        });
    }
}, (req, res, next) => {
    if ((0, driverExistById_1.driverExistById)(req.body.driver.id))
        next();
    else {
        res.status(404).json({
            error_code: "DRIVER_NOT_FOUND",
            error_description: `There is no driver registered with the id ${req.body.driver.id}.`
        });
    }
}, (req, res, next) => {
    if ((0, checkMinDistance_1.checkMinDistance)(req.body.distance, req.body.driver.id))
        next();
    else {
        res.status(406).json({
            error_code: "INVALID_DISTANCE",
            error_description: `Invalid mileage for driver ${req.body.driver.name}.`
        });
    }
}, rides_1.confirmRide);
exports.default = ridesRouter;
