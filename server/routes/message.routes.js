import {Router} from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/message.controller";
// const { protect } = require("../middleware/authMiddleware");

const router = Router();

router.route("/:chatId").get( allMessages);
router.route("/").post( sendMessage);

export default router;
