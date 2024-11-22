import {Router} from "express";
import { body, validationResult } from 'express-validator';
import { Request, Response , NextFunction} from "express-serve-static-core";
import { getDistance } from "../handlers/rides";
import { estimateFailResponseBody } from "../types/estimateFailResponseBody";

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
    (req: Request, res: Response<estimateFailResponseBody>, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let error_string:string = "";
            let errors_array = errors.array();
            for(let er of errors_array){
                error_string += er.msg;
                error_string += " ";
            }
            error_string = error_string.slice(0,-1);
            res.status(400).json({                 
                    error_code:"INVALID_DATA",
                    error_description: error_string 
            });
        }
        else{
            next();
        }        
    },
    getDistance
);


export default ridesRouter;