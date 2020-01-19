export class Player {
  UUID: string;
  name: string;
  lat: number;
  lng: number;
}
export class Pacman extends Player {
  lives: number;

  constructor(player: Player) {
    super();
    this.UUID = player.UUID;
    this.lat = player.lat;
    this.lng = player.lng;
    this.name = player.name;
    this.lives = 3;
  }
}

export class Pellet {
  lat: number;
  lng: number;
  id: number;
}

export enum States {
  Lobby, // Waiting for connect
  Hide, // Pacman runs away from ghosts
  Chase, // Ghosts chase pacman
  GameOver // Game is done
}

class GameMaster {
  state: States;
  players: Array<Player>;
  main: Pacman;
  pellets: Array<Pellet>;
}

let map_x : number;
let map_y : number;

let game: GameMaster = null;

export function init_game_state() {
  if (game == null) {
    game = new GameMaster();
    game.state = States.Lobby;
    game.players = [];
  }
}

export function handle_state_change(new_state: States) {
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
      return {}; // Return message about user
    }
  }
  return null;
}

export function process_user_update(info, msg_type) {
  let player: Player = null;
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
      if (
        player.UUID == game.main.UUID &&
        (game.state == States.Hide || game.state == States.Chase)
      ) {
        info.eatenPellets.forEach(element => {
          let pel = game.pellets.find(element2 => element2.id == element.id);
          game.pellets.splice(game.pellets.indexOf(pel), 1);
        });
        if (game.pellets.length == 0) {
          return States.GameOver;
        }
      } else if (
        game.state == States.Chase &&
        compareCords(player.lat, player.lng, game.main.lat, game.main.lng)
      ) {
        game.main.lives--;
        if (game.main.lives == 0) {
          return States.GameOver;
        }
      }
    } else if (
      msg_type == "GAME_STATE" &&
      game.state == States.Lobby &&
      game.players.length > 1
    ) {
      return States.Hide;
    }
  }

  return game.state;
}

function compareCords(lat1: number, lng1: number, lat2: number, lng2: number) {
  if (Math.abs(lat1 - lat2) < 0.0001 && Math.abs(lng1 - lng2) < 0.0001) {
    return true;
  }
  return false;
}

function register_user(info) {
  if (game.state == States.Lobby) {
    let create_pellets: boolean = false;
    if (game.players.length == 0) {
      create_pellets = true;
    }
    let noob: Player = new Player();
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

function generate_pts(lat: number, lng: number) {
  map_x = lat;
  map_y = lng;
  console.log("Generating Pellets");
  var express = require('express'); 
  var app = express(); 

  // Creates a server which runs on port 3000 and  
  // can be accessed through localhost:3000 
  app.listen(3000, function() { 
      console.log('server running on port 3000'); 
  } ) 
    
  // Function callName() is executed whenever  
  // url is of the form localhost:3000/name 
  app.get('/name', callName); 
}

function callName(req, res) { 
        
  // Use child_process.spawn method from  
  // child_process module and assign it 
  // to variable spawn 
  var spawn = require("child_process").spawn; 
    
  // Parameters passed in spawn - 
  // 1. type_of_script 
  // 2. list containing Path of the script 
  //    and arguments for the script  
    
  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
  // so, first name = Mike and last name = Will 
  var process = spawn('python', ["roads/start.py", map_x, map_y]); 

  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on('data', data => {
    console.log("Data returned");
    let splitData = data.split("/\r?\n/");
    let ptId = 0;
    splitData.forEach(element => {
      let cords = splitData.split(",");
      let pel = new Pellet();
      pel.id = ptId;
      pel.lat = cords[0];
      pel.lng = cords[1];
      ptId++;
      game.pellets.concat(pel);
      console.log([pel.lat, pel.lng]);
    });
  });
} 
