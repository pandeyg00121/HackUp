import express from 'express';
import hackathonController from "./../controllers/hackathon.controller.js";
// import { registerForHackathon } from './../controllers/hackathon.controller';

const router = express.Router();
router.use(express.json());
// POST /api/hackathons/register
router.post('/register', hackathonController.registerForHackathon);

export default router;
