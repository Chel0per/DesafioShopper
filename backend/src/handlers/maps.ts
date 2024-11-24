import { Request, Response } from "express-serve-static-core";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

export async function getMapUrl(req:Request,res:Response){
    res.status(200).json({"url":`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${encodeURIComponent(req.body.polyline)}&key=${process.env.GOOGLE_API_KEY}`});
}

const apiKey = "AIzaSyBwm5jk0JiVSTEKd9zwK9cUpq-tvFHXmyg"
const polyline = "hne_BzcfcH_BZaBb@Iv@NnBLl@RTf@^l@TfBa@NMl@Un@Mj@G^FXDHAZjA@f@CNGN@NLJTNP`@pApGhAjFlAdGAXORQ@QEIQ@ULW~HcBtHsAjJyAdIcAdLiAzGg@`G_@bV}@bHUhEGbEAfGH|FTbJl@xD`@j@HlCd@VTJX@HQz@GJBd@Nf@pI~Hz@p@tAz@zAp@hA`@v@TbBX~ANz@FbAB`BA~Jo@PITSvA_B^UPGXANEfBl@pChAVHpAn@f@JjBx@`Ah@~F|CbDhBtEbDvFhEhCxBpMxKp@n@dBzAnEbE~G`HhF|FxDtEpDjE`CbDrC~DvIrMzLdRlAfBzC~Elk@l|@~_@rl@`@VzCzBv@l@n@t@|EpHzFvI`AlA`BvAbGlC`@DjA`@bCl@fBTzCPtAD`C@jK^pNb@lHb@jE`@jHrAjLnBtO|CnCf@tDh@nCh@l@@vAVnJfBnU`E~L|BpAFdBA|B]tAc@~@g@z@o@r@q@t@cAn@oAZ}@XyANcB@sBCoCOcDq@sVScIDo@Ps@Xc@`@]vA{@"

const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400
&path=enc:${polyline}
&key=${apiKey}`;
