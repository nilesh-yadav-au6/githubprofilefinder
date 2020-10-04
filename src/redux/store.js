import { createStore ,applyMiddleware } from "redux"
import { composeWithDevTools }from "redux-devtools-extension"
import thunk from "redux-thunk"
import { combineReducers } from "redux"
import githubReducer from "./reducers/githubReducer"
import managerListReducer from "./reducers/managerListReducer"



const reducers = combineReducers({
    user:githubReducer,
    managerList:managerListReducer
})

const store = createStore(reducers , composeWithDevTools(applyMiddleware(thunk)))


export default store