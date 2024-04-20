import express from 'express';
import {Router} from "express";
import messageController from "../controllers/message.controller.js";
import authController from "./../controllers/auth.controller.js";

const router = Router();

router.use(express.json());

router.use(authController.protect);
router.route("/:chatId").get( messageController.allMessages);
router.route("/").post( messageController.sendMessage);

export default router;
