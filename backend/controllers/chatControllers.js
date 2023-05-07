const asyncHandler = require("express-async-handler");

const Chat = require("../models/chatModel");
const User = require("../models/userModel");

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
  })
    .populate("users", "-password")
    .populate("latestMessage");

    // console.log(isChat)
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    // console.log(isChat)

  if (isChat.length > 0) {
    // ! needs to revisit this block for sending status code
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

module.exports = { accessChat };
