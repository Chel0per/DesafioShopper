"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maps_1 = require("../handlers/maps");
const mapsRouter = (0, express_1.Router)();
mapsRouter.post("/image", maps_1.getMapUrl);
exports.default = mapsRouter;
