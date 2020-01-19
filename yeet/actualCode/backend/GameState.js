import Constants from 'expo-constants';

class GameState {
    static instance = GameState.instance || new GameState();

    constructor() {
        this.lat = 0.0;
        this.lng = 0.0;
        this.deviceID = Constants.installationId.toUpperCase();
        this.isPacman = false;
        this.eatenPellets = [];
        this.name = "";
        this.pellets = [];
    }
}

const gameState = GameState.instance;

export default gameState;
