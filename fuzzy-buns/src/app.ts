import * as socketio from "socket.io";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

enum GameStates {
  Lobby, // Waiting for connect
  Hide, // Pacman runs away from ghosts
  Chase, // Ghosts chase pacman
  GameOver // Game is done
}

console.log("Server started.");

var numUsers = 0;
var users = {};

io.on("connection", function(socket: any) {
  console.log("A user connected");

  socket.on("register", function(message: any) {
    users[message.deviceID] = message;
    socket.emit("new registration", message);
  });
});
