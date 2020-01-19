import io from "socket.io-client";
import gameState from "./GameState.js";

class ServerConnection {
    static instance = ServerConnection.instance || new ServerConnection();
    socket = io.connect('34.82.20.254')
    constructor() {
    }

    Register() {
        this.socket.emit("login", gameState);
    }
}

const serverSocket = ServerConnection.instance;

export default serverSocket;
