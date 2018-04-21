import {Action} from "redux";

import {Board, BoardInfo} from "../../types/board";

const enum BoardActionType {
  CREATE_BOARD = "create_board",
  SET_ACTIVE_BOARD = "set_active_board",
}

interface BoardAction extends Action {
  type: BoardActionType;
  payload: BoardInfo;
  requiresAuth?: boolean;
}

const createBoard = (payload: BoardInfo): BoardAction => ({
  type: BoardActionType.CREATE_BOARD,
  payload,
  requiresAuth: true,
});

const setActiveBoard = (payload: Board): BoardAction => ({
  type: BoardActionType.SET_ACTIVE_BOARD,
  payload,
});

export {
  BoardAction, BoardActionType,
  createBoard, setActiveBoard,
};
