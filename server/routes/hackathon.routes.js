import {upcomingHackathon,liveHackathon,pastHackathon} from "../controllers/hackathon.controller.js"
import { Router } from "express";

const router = Router();
router.route("/upcoming").get(upcomingHackathon);
router.route("/live").get(liveHackathon);
router.route("/past").get(pastHackathon);


export default router;