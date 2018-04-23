import {Action} from "redux";

interface NullAction extends Action {
  type: null;
}

const nullAction = (): NullAction => ({type: null});

export {NullAction, nullAction};
