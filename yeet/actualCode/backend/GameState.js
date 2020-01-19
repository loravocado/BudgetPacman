import Constants from 'expo-constants';

class GameState {
    static instance = ServerConnection.instance || new ServerConnection();

    constructor() {
        super()

        this.location = { latitude: 0.0, longitude: 0.0 };
        this.DeviceID = Constants.DeviceID;
        this.isPacman = false;
        this.collectedPellets = 0;
    }


}