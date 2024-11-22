"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorString = generateErrorString;
function generateErrorString(errors) {
    let error_string = "";
    let errors_array = errors.array();
    for (let er of errors_array) {
        error_string += er.msg;
        error_string += " ";
    }
    return error_string.slice(0, -1);
}
