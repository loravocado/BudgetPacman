import * as game from "./game";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

var users = [];
var mostRecentState;

game.init_game_state();

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("register", function(message: any) {
    users.push(message);
    var processUpdate = game.process_user_update(message, "PLAYER_STATE");
    mostRecentState = game.handle_state_change(processUpdate);
    console.log("hi");
    socket.broadcast.emit("new registration", users);
  });

  socket.on("start", function() {
    console.log("Starting game...");
    game.process_user_update(users, "GAME_STATE");
    var newstate = game.handle_state_change(game.States.Hide);
    socket.broadcast.emit("sync", newstate);
    console.log(newstate);
    socket.emit("start hide");
    game.handle_state_change(game.States.Chase);
  });
});
