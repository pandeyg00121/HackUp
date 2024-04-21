import express from 'express';
import {registerForHackathon} from "./../controllers/hackathon.controller.js";
// import { registerForHackathon } from './../controllers/hackathon.controller';

const router = express.Router();
router.use(express.json());
// POST /api/hackathons/register
router.post('/register',registerForHackathon);

export default router;
