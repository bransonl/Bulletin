interface NullAction {
  type: null,
}

const nullAction = (): NullAction => ({type: null});

export default nullAction;
