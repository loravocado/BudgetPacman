import * as socketio from "socket.io";
import * as game from "./game";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

var users = {};

io.on("connection", function(socket: any) {
  console.log("A user connected");

  socket.on("register", function(message: any) {
    users[message.deviceID] = message;
    socket.broadcast.emit("new registration", users);
  });

  socket.on("start", function(message: any) {
    // Player choose start.
    // Determine Pacman
    // Generate dots
    // Send back dots
    // Set to hide a
    // pass data to process user update
    // result to handle state change
  });
});
