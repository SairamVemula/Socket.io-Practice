const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

const port = process.env.PORT || 5000;

const rooms = ["listenLocation", "sendLocation"];

io.of("/LiveFeed").on("connection", (socket) => {
  console.log("A New User is connected in LiveFeed");
  socket.emit("welcome", "Welcome New User in LiveFeed");

  socket.on("joinRoom", (room) => {
    if (rooms.includes(room)) {
      socket.join(room);
      io.of("/LiveFeed")
        .to(rooms[1])
        .emit("newUser", "New User Joined " + room);
      socket.on("recLoc", (res) => {
        io.of("/LiveFeed").to(rooms[1]).emit("sentLoc", res);
      });
      return socket.emit(
        "success",
        "You have Successfully Joined Room :" + room
      );
    } else return socket.emit("err", "ERROR, No room name with :", room);
  });
});

app.get("/user", (req, res) => {
  res.send("hello");
});
http.listen(port, () => {
  console.log(`Server is listening on PORT ${port}...`);
});
