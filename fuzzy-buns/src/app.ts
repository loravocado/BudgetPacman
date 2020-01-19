import * as socketio from "socket.io";
import * as game from "./game";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

var users = [];

game.init_game_state();

io.on("connection", function(socket: any) {
  console.log("A user connected");

  socket.on("register", function(message: any) {
    users.push(message);
    var processUpdate = game.process_user_update(message, "PLAYER_STATE");
    var newState = game.handle_state_change(processUpdate);
    console.log("hi");
    socket.emit("new registration", users);
  });

  socket.on("start", function(message: any) {
    game.process_user_update(message, "GAME_STATE");
    game.handle_state_change(game.States.Chase);
  });
});
