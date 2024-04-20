import express from 'express';
// import {Router} from 'express';
import publisherController from "./../controllers/publisher.controller.js";

const router = express.Router();
router.use(express.json());

router.post("/signup", publisherController.signup);
router.post("/login", publisherController.login);
router.get('/logout', publisherController.logout);
// router.post("/forgotPassword", authController.forgotPassword);

// POST /api/hackathons/create
router.post('/create/:id', publisherController.createHackathon);

router.use(publisherController.protect); // Middleware for protected routes

// router.post("/updateMyPassword", authController.updatePassword);
// router.get("/me", userController.getMe, userController.getUser); // Combine getMe and getUser logic (if needed)
// router.post("/updateMe", userController.updateMe);

// router.delete("/deleteMe", userController.deleteMe);

export default router; // Export the router as the default export
