import gameState from "./GameState.js";
import io from "socket.io-client";

class ServerConnection {
    static instance = ServerConnection.instance || new ServerConnection();

    socket = io.connect("http://34.82.20.254/");
    users = [];

    constructor() {
        this.socket.on("new registration", this.newUserMessage.bind(this));
    }

    register() {
        this.socket.emit("register", gameState);
    }

    newUserMessage(users) {
        console.log("Someone else joined");
        console.log(users);
    }
}
const serverSocket = ServerConnection.instance;

export default serverSocket;