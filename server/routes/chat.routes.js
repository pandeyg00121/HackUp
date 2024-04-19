import {Router} from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chat.controller";
// const { protect } = require("../middleware/authMiddleware");

const router = Router();

router.route("/").post( accessChat);
router.route("/").get(fetchChats);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

export default router;