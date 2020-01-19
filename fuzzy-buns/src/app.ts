import * as socketio from "socket.io";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

var numUsers = 0;

io.on("connection", (socket: any) => {
  console.log("a user connected");

  socket.on("register", (message: any) => {
    console.log(message.deviceID);
  });
});
