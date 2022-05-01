const initialState = {
  errs: {},
};

export const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ERRORS': {
      return { errs: action.payload };
    }
    case 'CLEAR_ERRORS': {
      return { errs: action.payload };
    }
    default: {
      return state;
    }
  }
};
