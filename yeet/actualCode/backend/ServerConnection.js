import gameState from "./GameState.js";
import io from "socket.io-client";

class ServerConnection {
    static instance = ServerConnection.instance || new ServerConnection();
    socket = io.connect("http://34.82.20.254/");

    register() {

        this.socket.emit("register", gameState);
    }
}
const serverSocket = ServerConnection.instance;

export default serverSocket;