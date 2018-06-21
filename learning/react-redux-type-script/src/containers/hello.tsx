// https://github.com/vaibhavmule/react-redux-helloworld/blob/master/src/index.js
// https://medium.com/@nem121/todo-app-with-typescript-redux-e6a4c2f02079

import {connect} from 'react-redux';


import {helloWorld, reset} from "../actions/hello";

import Hello from './../components/Hello';

import {State} from "../reducers";

import * as fromHello from '../reducers/hello'

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state:State, ownProps:any):fromHello.State => {

    return {
        message:state.hello.message
    };

};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch:any, ownProps:any) => {

    return {

        onClick: () => dispatch(helloWorld()),
        reset : () => dispatch(reset())
    };
};

export const HelloWorld = connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello);

