import * as actions from "../actions/githubAction";
import * as types from "../actionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import getMocks from "../actions/githubAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it("Search By User Name", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getMocks,
      });
    });

    const expectedActions = [{ type: types.USER_DATA, payload: types.payload }];

    const store = mockStore({ user: [] });
    return store.dispatch(actions.searchByUser("NinjaAniket", 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Search By Repo Name", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getMocks,
      });
    });
    const expectedActions = [
      {
        type: types.GET_REPORISTORY,
        payload: types.payload,
        count: types.count,
      },
    ];

    const store = mockStore({ user: [] });
    return store.dispatch(actions.searchByRepo("cinemeye", 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should remove userdata and repo from state", () => {
    const expectedAction = {
      type: types.REMOVE_USERDATA_REPO,
    };
    expect(actions.remove()).toEqual(expectedAction);
  });
});
