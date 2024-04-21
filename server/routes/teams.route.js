import express from 'express';

import {createTeam, joinTeam} from "./../controllers/hackathon.controller.js";
import authController from "./../controllers/auth.controller.js";

// import { registerForHackathon } from './../controllers/hackathon.controller';

const router = express.Router();
router.use(express.json());
// POST /api/hackathons/register


router.use(authController.protect);
router.post('/register/create/:id',createTeam);
router.post('/register/join/:id',joinTeam);



export default router;
