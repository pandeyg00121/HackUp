import express from 'express';
import {Router} from "express";
import chatController from "../controllers/chat.controller.js";
import authController from "./../controllers/auth.controller.js";

const router = Router();
router.use(express.json());

router.use(authController.protect);
router.route("/").post( chatController.accessChat);
router.route("/").get(chatController.fetchChats);
router.route("/group").post(chatController.createGroupChat);
router.route("/rename").put(chatController.renameGroup);
router.route("/groupadd").put(chatController.addToGroup);
router.route("/groupremove").put(chatController.removeFromGroup);

export default router;