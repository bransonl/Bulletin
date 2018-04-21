import {Bullet} from "./bullet";

interface BoardInfo {
  name: string;
  description: string;
  privacy: string;
}

interface Board extends BoardInfo {
  id: number;
  updatedAt: Date;
  bullets?: Bullet;
}

export {Board, BoardInfo};
