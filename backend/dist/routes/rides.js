"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rides_1 = require("../handlers/rides");
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
        let error_string = "";
        let errors_array = errors.array();
        for (let er of errors_array) {
            error_string += er.msg;
            error_string += " ";
        }
        error_string = error_string.slice(0, -1);
        res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: error_string
        });
    }
    else {
        next();
    }
}, rides_1.getDistance);
exports.default = ridesRouter;
