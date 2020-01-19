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

io.on("connection", function(socket: any) {
  var addedUser = false;

  console.log("a user connected");

  // whenever we receive a 'message' we log it out
  socket.on("register", function(message: any) {
    if (addedUser) return;
    console.log(message.deviceID);
  });
});
