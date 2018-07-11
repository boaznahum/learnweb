import {Action} from "redux";
import {ActionTypes, RepoID, SetCurrentRepoAction} from "./repository/Actions";

export interface IAppState {

    currentRepo:RepoID

}

export const appDefaultState:IAppState  = {currentRepo:RepoID.LOCAL1}


export function appReducer(appState:IAppState=appDefaultState, action: Action):IAppState {

    if(action.type===ActionTypes.SET_CURRENT_REPO){
        const myAction:SetCurrentRepoAction = action as SetCurrentRepoAction;

        return { ... appState, currentRepo:myAction.payload.currentRepo }

    }
    return appState;
}



