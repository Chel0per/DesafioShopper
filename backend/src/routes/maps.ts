import {Router} from "express";
import { getMapUrl } from "../handlers/maps";

const mapsRouter = Router();

mapsRouter.post("/image",getMapUrl);

export default mapsRouter;