//
// Define here the root state and root reducer
//
import {Action, combineReducers} from "redux";

import {ActionTypes, RepoID, SetCurrentRepoAction} from "../repository/Actions";
import * as Repo from '../repository/Reducer'


export interface RootState {

    someDummy:string;

    repo:Repo.RepositoriesState

    currentRepo:RepoID
}

export const initialState:RootState = {

    someDummy:"A dummy to learn",
    repo:Repo.repositoriesInitial,
    currentRepo:RepoID.LOCAL1

};

export function dummy(state: string = "kuku", action: Action) {

    return state;


}

function currentRepoReducer(currentRepo:RepoID=RepoID.LOCAL1, action: Action):RepoID{

    if(action.type===ActionTypes.SET_CURRENT_REPO){
        const myAction:SetCurrentRepoAction = action as SetCurrentRepoAction;
        return myAction.payload.currentRepo;

    }
    return currentRepo;
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
        currentRepo:currentRepoReducer
    }
);


