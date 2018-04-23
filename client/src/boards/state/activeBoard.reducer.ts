import {BoardAction, BoardActionType} from "./board.action";
import {Board, BoardInfo} from "../types/board";

type ActiveBoardState = Board;

const activeBoard = (
  state: ActiveBoardState = null,
  action: BoardAction,
): ActiveBoardState => {
  switch (action.type) {
    case BoardActionType.SetActiveBoard:
      return action.payload as Board;
    default:
      return state;
  }
};

export {ActiveBoardState};
export default activeBoard;
