import { Player } from "./game"

export class Pacman extends Player {
    lives : number;
}

export class Ghost extends Player {
    
}

export class Pellet {
    lat : number;
    lng : number;
    id : number;
}