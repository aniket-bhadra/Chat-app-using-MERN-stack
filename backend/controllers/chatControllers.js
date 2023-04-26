const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
  //responsible for creating & fetching one and one chat
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
});
