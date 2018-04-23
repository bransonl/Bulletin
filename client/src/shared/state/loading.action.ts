import {Action} from "redux";

const enum LoadingActionType {
  ShowLoading = "show_loading",
  HideLoading = "hide_loading",
}

interface LoadingAction extends Action {
  type: LoadingActionType;
}

const showLoading = (): LoadingAction => ({
  type: LoadingActionType.ShowLoading,
});

const hideLoading = (): LoadingAction => ({
  type: LoadingActionType.HideLoading,
});

export {
  LoadingAction, LoadingActionType,
  showLoading, hideLoading,
};
