


// https://medium.com/@nem121/todo-app-with-typescript-redux-e6a4c2f02079
// https://github.com/vaibhavmule/react-redux-helloworld/blob/master/src/index.js



import {Action, ActionTypes} from "../actions/hello";

export interface State {
    message:string
}


export const  initialState:State = { message:'HELLO'};

export function reducer  (state:State=initialState, action:Action) {

    switch (action.type) {
        case ActionTypes.HELLO_WORLD:

            return { ...state, message: 'HELLO World'};


        case  ActionTypes.RESET:
            return initialState;


        default:
            return state;
    }

}

/*
const reducer = combineReducers({
    helloWorld
});
*/



