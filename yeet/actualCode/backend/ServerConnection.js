import io from "socket.io-client";

class ServerConnection {
    static instance = ServerConnection.instance || new ServerConnection();

}

const serverSocket = ServerConnection.instance;

export default serverSocket;
