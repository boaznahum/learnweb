import {Action} from "redux";
import {ActionTypes, RepoID} from "./repository/Actions";

export interface IGTerminalState {
    // 1 - local 1, 2 - local 2, 3 - remote
    currentRepo: RepoID;
    inHandler:boolean;

    isPlaying:boolean;
    playLines:string[];
    currentLine:number;

}


export const  terminalDefaultState:IGTerminalState = {
    currentRepo:RepoID.LOCAL1,

    inHandler:false,

    isPlaying:false,
    playLines:[],
    currentLine:-1

};

export interface ChangeInHandlerAction {

    type:ActionTypes.SET_IN_HANDLER_STATE
    payload: {
        inHandler:boolean;
    }

}

export interface TerminalPlayStartAction {

    type:ActionTypes.TERMINAL_PLAY_START
    payload: {
        playLines:string[]
    }
}

export interface TerminalPlayNextLineAction {

    type:ActionTypes.TERMINAL_PLAY_NEXT_LINE
    payload: {
        currentLine:number
    }
}

export interface TerminalPlayDoneAction {

    type:ActionTypes.TERMINAL_PLAY_DONE
}


export function terminalReducer(terminalState:IGTerminalState=terminalDefaultState, action: Action):IGTerminalState {

    if(action.type===ActionTypes.SET_IN_HANDLER_STATE){
        
        const myAction:ChangeInHandlerAction = action as ChangeInHandlerAction;

        return { ... terminalState, inHandler:myAction.payload.inHandler }

    } else if(action.type===ActionTypes.TERMINAL_PLAY_START){

        const myAction:TerminalPlayStartAction = action as TerminalPlayStartAction;

        return { ... terminalState,
            isPlaying:true,
            playLines:myAction.payload.playLines,
            currentLine:0
        }

    } else if(action.type===ActionTypes.TERMINAL_PLAY_NEXT_LINE){

        const myAction:TerminalPlayNextLineAction = action as TerminalPlayNextLineAction;

        return { ... terminalState, currentLine:myAction.payload.currentLine }

    } else if(action.type===ActionTypes.TERMINAL_PLAY_DONE){



        return { ... terminalState, isPlaying:false }

    }
    return terminalState;
}

