import { ADD_TO_MANAGER } from "../actionTypes";

const initialState = {
  repolist: [],
};

const managerListRedicer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_MANAGER:
      return { ...state, repolist:[...state.repolist ,payload] };
    default:
      return state;
  }
};

export default managerListRedicer;

