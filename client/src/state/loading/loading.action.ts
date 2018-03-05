import {Action} from "redux";

const enum LoadingActionType {
  SHOW_LOADING = "show_loading",
  HIDE_LOADING = "hide_loading",
}

interface LoadingAction extends Action {
  type: LoadingActionType;
}

const showLoading = (): LoadingAction => ({
  type: LoadingActionType.SHOW_LOADING,
});

const hideLoading = (): LoadingAction => ({
  type: LoadingActionType.HIDE_LOADING,
});

export {
  LoadingAction, LoadingActionType,
  showLoading, hideLoading,
};
