"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverExistById = driverExistById;
function driverExistById(id) {
    const validIds = [1, 2, 3];
    return validIds.includes(id);
}
