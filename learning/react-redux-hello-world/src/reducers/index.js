import { combineReducers} from 'redux';

import {HELLO_WORLD, RESET} from "../actions";

let initialState = { message:'HELLO'};

const helloWorld = (state=initialState, action) => {

    switch (action.type) {
        case HELLO_WORLD:

            return { ...state, message: 'HELLO World'};


        case  RESET:
            return initialState;


        default:
            return state;
    }

};

const helloReducer = combineReducers({
    helloWorld
});


export default helloReducer;