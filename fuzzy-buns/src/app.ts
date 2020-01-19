import * as game from "./game";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

var users = [];

game.init_game_state();

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("register", function(message: any) {
    users.push(message);
    var processUpdate = game.process_user_update(message, "PLAYER_STATE");
    var newState = game.handle_state_change(processUpdate);
    console.log("hi");
    socket.broadcast.emit("new registration", users);
  });

  socket.on("start", function(message: any) {
    console.log("Starting game...");
    socket.emit("sync");
    game.process_user_update(message, "GAME_STATE");
    var newstate = game.handle_state_change(game.States.Hide);
    console.log(newstate);
    socket.emit("start hide");
    game.handle_state_change(game.States.Chase);
  });
});
