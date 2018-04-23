import {BoardAction, BoardActionType} from "./board.action";
import {Board, BoardInfo} from "../types/board";

type BoardsState = Board[];

const boards = (
  state: BoardsState = [],
  action: BoardAction,
): BoardsState => {
  switch (action.type) {
    case BoardActionType.SetBoards:
      return action.payload as BoardsState;
    default:
      return state;
  }
};

export {BoardsState};
export default boards;
