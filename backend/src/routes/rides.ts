import {Router} from "express";
import { body, validationResult } from 'express-validator';
import { Request, Response , NextFunction} from "express-serve-static-core";
import { getDistance,confirmRide } from "../handlers/rides";
import { ConfirmRequestBody } from "../types/ConfirmRequestBody";
import { InvalidDataFailResponseBody } from "../types/InvalidDataFailResponseBody";
import { DriverNotFoundFailResponseBody } from "../types/DriverNotFoundFailResponseBody";
import { InvalidDistanceFailResponseBody } from "../types/InvalidDistanceFailResponseBody";
import { generateErrorString } from "../services/generateErrorString";
import { driverExistById } from "../services/driverExistById";
import { checkMinDistance } from "../services/checkMinDistance";

const ridesRouter = Router();

ridesRouter.post(
    '/estimate',
    [
        body("customer_id")
            .notEmpty()
            .withMessage("Customer Id is required."),
        body("origin")
            .notEmpty()
            .withMessage("Origin is required."),
        body("destination")
            .notEmpty()
            .withMessage("Destination is required.")
            .custom((value, { req }) => {
                if (value === req.body.origin) {
                    throw new Error("Origin and destination must be different.");
                }
                return true;
            })
    ],
    (req: Request, res: Response<InvalidDataFailResponseBody>, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({                 
                    error_code:"INVALID_DATA",
                    error_description: generateErrorString(errors) 
            });
        }
        else{
            next();
        }        
    },
    getDistance
);

ridesRouter.patch(
    '/confirm',
    [
        body("customer_id")
            .notEmpty()
            .withMessage("Customer Id is required."),
        body("origin")
            .notEmpty()
            .withMessage("Origin is required."),
        body("destination")
            .notEmpty()
            .withMessage("Destination is required.")
            .custom((value, { req }) => {
                if (value === req.body.origin) {
                    throw new Error("Origin and destination must be different.");
                }
                return true;
            })
    ],
    (req:Request<{},{},ConfirmRequestBody>, res: Response<InvalidDataFailResponseBody>, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) next();            
        else{
            res.status(400).json({                 
                error_code:"INVALID_DATA",
                error_description: generateErrorString(errors) 
            });
        }        
    },
    (req: Request<{},{},ConfirmRequestBody>, res: Response<DriverNotFoundFailResponseBody>, next: NextFunction) => {
        if(driverExistById(req.body.driver.id)) next();
        else {
            res.status(404).json({                 
                error_code:"DRIVER_NOT_FOUND",
                error_description:`There is no driver registered with the id ${req.body.driver.id}.` 
            });
        }
    },
    (req: Request<{},{},ConfirmRequestBody>, res: Response<InvalidDistanceFailResponseBody>, next: NextFunction) => {
        if(checkMinDistance(req.body.distance,req.body.driver.id)) next();
        else {
            res.status(406).json({                 
                error_code:"INVALID_DISTANCE",
                error_description:`Invalid mileage for driver ${req.body.driver.name}.` 
            });
        }
    },
    confirmRide
);

export default ridesRouter;