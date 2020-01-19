import {Pellet, Pacman, Ghost} from "./pacTypes"

export class Player {
    UUID : string;
    name : string;
    lat : number;
    lng : number;
    timestamp : Date;
}

enum States {
    Lobby, // Waiting for connect
    Hide, // Pacman runs away from ghosts
    Chase, // Ghosts chase pacman
    GameOver // Game is done
}

class GameMaster {
    state : States;
    players : Array<Player>;
    pellets : Array<Pellet>;
}

let game : GameMaster = null;

function init_game_state() {
    if (game == null) {
        game = new GameMaster();
        game.state = States.Lobby;
        game.players = [];
    }
}

function process_user_state() {

}

function register_user(UUID : string, name : string) {
    if (game.state == States.Lobby) {
        
    }
}

function generate_pts(lat : number, lng : number) {

}