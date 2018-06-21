
// https://github.com/vaibhavmule/react-redux-helloworld/blob/master/src/index.js
// https://medium.com/@nem121/todo-app-with-typescript-redux-e6a4c2f02079
// Root state


import {combineReducers} from "redux";
import  * as fromHello from './hello'

// root state of the application
// Contains every sub state
export interface State {

    hello: fromHello.State;

}

export const initialState:State = {
    hello:fromHello.initialState
};

export const  reducer = combineReducers<State>(
    {
        hello:fromHello.reducer
    }
);

