const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

//creating chat for that user
router.route("/").post(protect, accessChat);
//fetching a chats for that user
router.route("/").get(protect, fetchChats);
//creation of the group
router.route("/group").post(protect, createGroupChat);
//rename a particaular group
router.route("/rename").put(protect, renameGroup);
// //remove someone from group or leave a group
// router.route("/groupremove").put(protect, removeFromGroup);
// //add someone to the group
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
