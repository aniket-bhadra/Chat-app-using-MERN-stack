const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const { chats } = require("./data/data");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
} = require("./middleware/errorsMiddleware");

dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started on PORT ${PORT}`.yellow.bold)
);

//called this function
//pingTimeout means--how much time it will wait and then stop the connection to save the bandwidth, means in this case it waits for 60000ms or 60sec then it goes off,so for 60sec if any user did not send any message or something,it's gonna close the connection to save the bandwidth
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

//create an connection, first give an name, like "connection", then pass an callback (whenver someone tries to connect to, from the frontend its gonna startup)
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  //this will take userData from the frontend, basically we are creating an new socke where frontend will send some data and will join a room
  socket.on("setup", (userData) => {
    //we will create an new room with the id of user data, and that room will be exclusive for that user only
    socket.join(userData._id);
    //so this has created a room for that particular user
    socket.emit("connected");
  });

  //joining an chat
  socket.on("join chat", (room) => {
    //create a room with the id of room
    socket.join(room);
    console.log("User joined a Room: " + room);
  });
  //so whenever in client side we click any of the chat,this should create a new room with that particular user and the other as well,so when other user joins,its gonna add that user to this particular room.

  //create new socket for typing
  socket.on("typing", (room) => {
    let roomId = room;
    socket.in(room).emit("typing", roomId);
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //create an new socket
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    //for testing
    if (!chat.users) return console.log("chat.user not defined");

    //if i send a message, i want that messeage to be emitted to all of the other ussers execept me
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      //otherwise its gonna send it to other users, 'in' means inside that user's room emit/send that message
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
