import {Action} from "redux";
import {ActionTypes, RepoID} from "./repository/Actions";

export interface IGTerminalState {
    // 1 - local 1, 2 - local 2, 3 - remote
    currentRepo: RepoID;
    inHandler:boolean;
}


export const  terminalDefaultState:IGTerminalState = {
    currentRepo:RepoID.LOCAL1,

    inHandler:false
};

export interface ChangeInHandlerAction {

    type:ActionTypes.SET_IN_HANDLER_STATE
    payload: {
        inHandler:boolean;
    }

}


export function terminalReducer(terminalState:IGTerminalState=terminalDefaultState, action: Action):IGTerminalState {

    if(action.type===ActionTypes.SET_IN_HANDLER_STATE){
        
        const myAction:ChangeInHandlerAction = action as ChangeInHandlerAction;

        return { ... terminalState, inHandler:myAction.payload.inHandler }

    }
    return terminalState;
}

