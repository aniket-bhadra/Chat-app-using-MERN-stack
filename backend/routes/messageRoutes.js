const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { sendMessages } = require("../controllers/messageControllers");

router.route("/").post(protect, sendMessages);
// router.route("/:chatId").get(protect, allMessages);

module.exports = router;
