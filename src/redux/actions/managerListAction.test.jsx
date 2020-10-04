import * as actions from "../actions/managerListAction";
import * as types from "../actionTypes";


describe("manager actions", () => {
 
  it("Add Repos to Manager", () => {
    const expectedAction = {
      type: types.ADD_TO_MANAGER,
      payload: "cinemeye"
    };
    expect(actions.addRepoToManager("cinemeye")).toEqual(expectedAction);
  });
});
