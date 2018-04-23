import {Action} from "redux";

import {Board, BoardInfo} from "../types/board";

const enum BoardActionType {
  CreateBoard = "create_board",
  SetActiveBoard = "set_active_board",
  SetBoards = "set_boards",
}

interface BoardAction extends Action {
  type: BoardActionType;
  payload: BoardInfo | Board[];
  requiresAuth?: boolean;
}

const createBoard = (payload: BoardInfo): BoardAction => ({
  type: BoardActionType.CreateBoard,
  payload,
  requiresAuth: true,
});

const setActiveBoard = (payload: Board): BoardAction => ({
  type: BoardActionType.SetActiveBoard,
  payload,
});

const setBoards = (payload: Board[]): BoardAction => ({
  type: BoardActionType.SetBoards,
  payload,
});

export {
  BoardAction, BoardActionType,
  createBoard, setActiveBoard, setBoards,
};
