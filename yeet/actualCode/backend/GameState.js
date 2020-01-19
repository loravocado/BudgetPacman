import Constants from 'expo-constants';

class GameState {
    static instance = GameState.instance || new GameState();

    constructor() {
        this.location = { latitude: 0.0, longitude: 0.0 };
        this.DeviceID = Constants.DeviceID;
        this.isPacman = false;
        this.collectedPellets = 0;
        this.name = "";
    }


}

const gameState = GameState.instance;

export default gameState;
