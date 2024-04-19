import express from 'express';
// import {Router} from 'express';
import authController from "./../controllers/auth.controller.js";
import userController from "./../controllers/user.controller.js";

const router = express.Router();
router.use(express.json());

router.post("/signup", authController.signup);
router.get("/verifyemail/:verificationCode", authController.verifyEmailHandler);
router.post("/login", authController.login);
router.get('/logout', authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect); // Middleware for protected routes

router.post("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser); // Combine getMe and getUser logic (if needed)
router.post("/updateMe", userController.updateMe);

router.delete("/deleteMe", userController.deleteMe);

export default router; // Export the router as the default export
