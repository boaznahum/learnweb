// https://github.com/vaibhavmule/react-redux-helloworld/blob/master/src/index.js
// https://medium.com/@nem121/todo-app-with-typescript-redux-e6a4c2f02079


export enum ActionTypes {
    HELLO_WORLD= 'HELLO_WORD',
    RESET = 'RESET'
}

export interface HelloWorldAction {
    type:ActionTypes.HELLO_WORLD,
    payload : {}
}

export interface ResetAction {

    type:ActionTypes.RESET,
    payload: {}

}

export function helloWorld() :HelloWorldAction {
    return {
        type:ActionTypes.HELLO_WORLD,
        payload:{}
    }
}

export function reset() : ResetAction {
    return {
        type:ActionTypes.RESET,
        payload:{}
    }
}

export type  Action = HelloWorldAction | ResetAction




