import { Player } from "./game"

export class Pacman extends Player {
    pellets : number;
    lives : number;
}

export class Ghost extends Player {
    freeze : boolean;
}

export class Pellet {
    lat : number;
    lng : number;
}