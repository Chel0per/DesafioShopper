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
exports.getMapUrl = getMapUrl;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
function getMapUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue%7Clabel:O%7C${req.body.origin.latitude},${req.body.origin.longitude}&markers=color:blue%7Clabel:D%7C${req.body.destination.latitude},${req.body.destination.longitude}&path=enc:${encodeURIComponent(req.body.polyline)}&key=${process.env.GOOGLE_API_KEY}`;
        const imageUrlData = yield fetch(imageUrl, { method: "POST" });
        const buffer = yield imageUrlData.arrayBuffer();
        const stringifiedBuffer = Buffer.from(buffer).toString('base64');
        const contentType = imageUrlData.headers.get('content-type');
        res.status(200).json({ "url": `data:${contentType};base64,${stringifiedBuffer}` });
    });
}
;
