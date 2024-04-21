import express from 'express';
import publisherController from "./../controllers/publisher.controller.js";

const router = express.Router();
router.use(express.json());

router.post("/signup", publisherController.signup);
router.post("/login", publisherController.login);
router.get('/logout', publisherController.logout);

// Middleware for protected routes

// POST /api/hackathons/create
router.post('/create/:id', publisherController.createHackathon);
router.use(publisherController.protect);

router.get('/hackathons/:id', publisherController.viewHackathons);

router.put('/winning/:id', publisherController.chooseWinningTeams);
router.get('/g/:id', publisherController.viewWinningTeams);

router.get('/hackathon-teams/:id', publisherController.viewHackathonTeams);

export default router;
