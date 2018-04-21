import {BoardAction, BoardActionType} from "./board.action";
import {Board, BoardInfo} from "../../types/board";

type BoardState = Board;

const board = (state: BoardState = null, action: BoardAction): BoardState => {
  switch (action.type) {
    case BoardActionType.SET_ACTIVE_BOARD:
      return action.payload as Board;
    default:
      return state;
  }
};

export {BoardState};
export default board;
