import { Result,ValidationError } from 'express-validator';

export function generateErrorString(errors:Result<ValidationError>):string{

    let error_string:string = "";
    let errors_array = errors.array();

    for(let er of errors_array){
        error_string += er.msg;
        error_string += " ";
    }
    
    return error_string.slice(0,-1);

}