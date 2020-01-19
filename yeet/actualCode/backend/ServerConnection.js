import io from "socket.io-client";
import gameState from "GameState";

class ServerConnection {
    static instance = ServerConnection.instance || new ServerConnection();
    static socket = io.connect('34.82.20.254')
    constructor() {
    }

    Register() {
        socket.emit("login");
    }
}

const serverSocket = ServerConnection.instance;

export default serverSocket;
