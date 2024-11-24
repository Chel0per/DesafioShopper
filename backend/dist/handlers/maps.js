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
        res.status(200).json({ "url": `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${encodeURIComponent(req.body.polyline)}&key=${process.env.GOOGLE_API_KEY}` });
    });
}
const apiKey = "AIzaSyBwm5jk0JiVSTEKd9zwK9cUpq-tvFHXmyg";
const polyline = "hne_BzcfcH_BZaBb@Iv@NnBLl@RTf@^l@TfBa@NMl@Un@Mj@G^FXDHAZjA@f@CNGN@NLJTNP`@pApGhAjFlAdGAXORQ@QEIQ@ULW~HcBtHsAjJyAdIcAdLiAzGg@`G_@bV}@bHUhEGbEAfGH|FTbJl@xD`@j@HlCd@VTJX@HQz@GJBd@Nf@pI~Hz@p@tAz@zAp@hA`@v@TbBX~ANz@FbAB`BA~Jo@PITSvA_B^UPGXANEfBl@pChAVHpAn@f@JjBx@`Ah@~F|CbDhBtEbDvFhEhCxBpMxKp@n@dBzAnEbE~G`HhF|FxDtEpDjE`CbDrC~DvIrMzLdRlAfBzC~Elk@l|@~_@rl@`@VzCzBv@l@n@t@|EpHzFvI`AlA`BvAbGlC`@DjA`@bCl@fBTzCPtAD`C@jK^pNb@lHb@jE`@jHrAjLnBtO|CnCf@tDh@nCh@l@@vAVnJfBnU`E~L|BpAFdBA|B]tAc@~@g@z@o@r@q@t@cAn@oAZ}@XyANcB@sBCoCOcDq@sVScIDo@Ps@Xc@`@]vA{@";
const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400
&path=enc:${polyline}
&key=${apiKey}`;
