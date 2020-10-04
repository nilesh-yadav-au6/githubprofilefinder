import { USER_REPO, USER_DATA, GET_REPORISTORY,REMOVE_USERDATA_REPO } from "../actionTypes";
import axios from "axios";


let repocount;

export const searchByUser = (userName, page) => async (dispatch) => {
  try {
    const  {data}  = await axios(`https://api.github.com/users/${userName}`); 
    dispatch({ type: USER_DATA, payload: data });
    const repos = await axios(`${data.repos_url}?page=${page}&per_page=20`);
    dispatch({
      type: USER_REPO,
      payload: repos.data,
      count: data.public_repos,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const searchByRepo = (repoName, page) => async (dispatch) => {
  try {
    if (!page) {
      const repos = await axios(
        `https://api.github.com/search/repositories?q=${repoName}&sort=stars&order=desc`
      );
      repocount = repos.data.items.length;
      dispatch({
        type: GET_REPORISTORY,
        payload: repos.data,
        count: repos.data.items.length,
      });
    }
    const { data } = await axios(
      `https://api.github.com/search/repositories?q=${repoName}&sort=stars&order=desc&page=${page}&per_page=20`
    );
    dispatch({ type: GET_REPORISTORY, payload: data, count: repocount });
  } catch (err) {
    console.log(err.message);
  }
};

export const remove = () => {
  return {
    type: REMOVE_USERDATA_REPO,
  };
};

