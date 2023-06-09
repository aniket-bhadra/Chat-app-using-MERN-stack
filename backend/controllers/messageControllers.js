const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    // ! instead of console.log here, use ------ new Error("")
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // * here we need to add one extra layer of validation where we will check chatId's users array, before sending message to chat,  need to check is bearer token's userId exist inside that given chatId's users array??? it help us-- that only the users part of that chat, can send message inside that chat.

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    //since here we are not populating directly inside of a query, we are populating an instance that is why here---used execPopulate()---->(deprecated)..

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {

    // * here we need to add one extra layer of validation where we will check chatId's users array, before fetching all messages from a particular chat,  need to check is bearer token's userId exist inside that given chatId's users array??? it help us-- that only the users part of that chat, can fetch all messages inside that chat, other users who are not part of that chat can not fetch the messages inside that chat.



    //* need to add one more validation to handle------if chat id has valid syntax, but that chat does not exist--send some error saying-- "this chat does not exist", without this, if chat id is valid then empty [] is returned.

  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessages, allMessages };
