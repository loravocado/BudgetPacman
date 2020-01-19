import * as socketio from "socket.io";

var http = require("http")
  .createServer()
  .listen(80, "0.0.0.0");

let io = require("socket.io")(http);

console.log("Server started.");

io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("login", function(message: any) {
    console.log(message);
  });
  socket.on("update", function(message: any) {
    socket.emit("broadcast", message);
  });
});
