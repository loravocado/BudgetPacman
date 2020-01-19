import { Player } from "./game"

export class Pacman extends Player {
    lives : number;

    constructor(player : Player){
        super();
        this.UUID = player.UUID;
        this.lat = player.lat;
        this.lng = player.lng;
        this.name = player.name;
        this.lives = 3;
    }
}

export class Pellet {
    lat : number;
    lng : number;
    id : number;
}