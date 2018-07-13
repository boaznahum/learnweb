//
// Define here the root state and root reducer
//
import {Action, combineReducers} from "redux";

import {appDefaultState, appReducer, IAppState} from "../AppState";
import * as Repo from '../repository/Reducer'
import {IGTerminalState, terminalDefaultState, terminalReducer} from "../terminal/GitTerminalState";


export interface RootState {

    someDummy:string;

    repo:Repo.RepositoriesState

    app:IAppState

    terminalState:IGTerminalState


}

export const rootInitialState:RootState = {

    someDummy:"A dummy to learn",
    repo:Repo.repositoriesInitial,
    app:appDefaultState,
    terminalState:terminalDefaultState

};

export function dummy(state: string = "kuku", action: Action) {

    return state;


}


/**
 * All the reducers are called, each git its state,
 * How does't it know each state to pass ?
 *
 * @type {Reducer<RootState>}
 */

export const  reducer = combineReducers<RootState>(
    {
        // what does this name mean ? - this is the name in the super state !!!
        someDummy:dummy,
        repo:Repo.repositoriesReducer,

        terminalState: terminalReducer,

        app:appReducer
    }
);


