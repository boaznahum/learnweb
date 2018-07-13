import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer, rootInitialState} from "./root/reducer";

const store = createStore(reducer, rootInitialState, applyMiddleware(thunk));

export default store;
