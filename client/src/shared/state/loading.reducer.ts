import {LoadingAction, LoadingActionType} from "./loading.action";

type LoadingState = boolean;

const defaultState = false;

const isLoading = (
  state: LoadingState = defaultState,
  action: LoadingAction,
): LoadingState => {
  switch (action.type) {
    case LoadingActionType.ShowLoading:
      return true;
    case LoadingActionType.HideLoading:
      return false;
    default:
      return state;
  }
};

export {LoadingState};
export default isLoading;
