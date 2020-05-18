const io = require("socket.io-client");
const socket = io.connect("http://vps3.inspeero.com:2030/liveFeed");

socket.on("welcome", (data) => {
  console.log("Recieved : ", data);
});

socket.on("newUser", (user) => console.log(user));
socket.emit("joinRoom", "infected");

socket.on("success", (success) => console.log(success));
socket.on("err", (err) => console.log(err));

setInterval(() => {
  socket.emit("location", {
    id: "7642764721647264",
    location: [54.9384, 76.2973],
  });
}, 1000);

socket.on("location", (res) => console.log(res));
