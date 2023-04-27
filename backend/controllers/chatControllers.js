const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
  //responsible for creating & fetching one and one chat, not group chat
  const { userId } = req.body;

  if (!userId) {
    // ! this code needs to revisit--console.log() part
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  //now checks whether the chat exist with that user with login user
  let isChat = await Chat.find({
    isGroupChat: false,

    //in case of $and, both of the condition has to match to return any document
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  });
});
