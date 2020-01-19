import {Pellet, Pacman } from "./pacTypes"

export class Player {
    UUID : string;
    name : string;
    lat : number;
    lng : number;
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
    main : Pacman;
    pellets : Array<Pellet>;
}

let game : GameMaster = null;

export function init_game_state() {
    if (game == null) {
        game = new GameMaster();
        game.state = States.Lobby;
        game.players = [];
    }
}

export function handle_state_change(new_state : States) {
    if (new_state != game.state) {
        game.state = new_state;
        if (game.state == States.Lobby) {
            game.players = [];
            game.main = null;
            return null;
        } else if (game.state == States.Hide) {
            let playerIndex = Math.floor(Math.random() * game.players.length);
            game.main = new Pacman(game.players[playerIndex]);
            game.players[playerIndex] = game.main;
            return {};
        } else if (game.state == States.Chase) {
            return {};
        } else if (game.state == States.GameOver) {
            return {};  // Return message about user
        }
    }

    return null;
}

export function process_user_update(info, msg_type) {

    let player : Player = null;
    game.players.forEach(element => {
        if (info.deviceId == element.UUID) {
            player = element;
            return;
        }
    });

    if (player == null && msg_type == "PLAYER_STATE") {
        register_user(info);
    } else {
        if (msg_type == "PLAYER_STATE") {
            player.lat = info.lat;
            player.lng = info.lng;
            if (player.UUID == game.main.UUID && (game.state == States.Hide || game.state == States.Chase)) {
                info.eatenPellets.forEach(element => {
                    let pel = game.pellets.find(element2 => element2.id == element.id);
                    game.pellets.splice(game.pellets.indexOf(pel), 1);
                });
                if (game.pellets.length == 0) {
                    return States.GameOver;
                }
            } else if (game.state == States.Chase && compareCords(player.lat, player.lng, game.main.lat, game.main.lng)) {
                game.main.lives--;
                if (game.main.lives == 0) {
                    return States.GameOver;
                }
            }
        } else if (msg_type == "GAME_STATE" && game.state == States.Lobby && game.players.length > 1) {
            return States.Chase;
        }
    }

    return game.state;
}

function compareCords(lat1 : number, lng1 : number, lat2 : number, lng2 : number) {
    if (Math.abs(lat1 - lat2) < 0.0001 && Math.abs(lng1 - lng2) < 0.0001) {
        return true;
    }
    return false;
}

function register_user(info) {
    if (game.state == States.Lobby) {
        let create_pellets : boolean = false;
        if (game.players.length == 0) {
            create_pellets = true;
        }
        let noob : Player = new Player();
        noob.UUID = info.deviceId;
        noob.lat = info.lat;
        noob.lng = info.lng;
        noob.name = info.name;
        game.players.concat(noob);

        if (create_pellets) {
            generate_pts(info.lat, info.lng);
        }
    }
}

function generate_pts(lat : number, lng : number) {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["roads/start.py", lat, lng]);

    let ptId = 0;

    pythonProcess.stdout.on('data', (data) => {
        let splitData = data.split('/\r?\n/');
        splitData.forEach(element => {
            let cords = splitData.split(',');
            let pel = new Pellet();
            pel.id = ptId;
            pel.lat = cords[0];
            pel.lng = cords[1];
            ptId++;
            game.pellets.concat(pel);
        });
    });
}