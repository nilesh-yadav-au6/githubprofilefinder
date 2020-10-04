import { ADD_TO_MANAGER } from "../actionTypes";

export const addRepoToManager = (repo) => {
  return {
    type: ADD_TO_MANAGER,
    payload: repo,
  };
};
