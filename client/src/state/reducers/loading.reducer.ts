import {LoadingAction, LoadingActionType} from "../actions/loading.action";

type LoadingState = boolean;

const defaultState = false;

const isLoading = (state: LoadingState = defaultState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    case LoadingActionType.SHOW_LOADING:
      return true;
    case LoadingActionType.HIDE_LOADING:
      return false;
    default:
      return state;
  }
};

export {LoadingState};
export default isLoading;
