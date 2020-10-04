import { USER_DATA, USER_REPO, GET_REPORISTORY,REMOVE_USERDATA_REPO } from "../actionTypes";

const initialState = {
  user: null,
  repos: null,
  repository: null,
  count: "",
};

const githubReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DATA:
      return { ...state, user: payload };
    case USER_REPO:
      return { ...state, repos: payload, count: action.count };
    case GET_REPORISTORY:
      return { ...state, repository: payload.items, count: action.count };
    case REMOVE_USERDATA_REPO:
      return {...state , user:null ,repos:null,count:"" ,repository:null}
    default:
      return state;
  }
};

export default githubReducer;
