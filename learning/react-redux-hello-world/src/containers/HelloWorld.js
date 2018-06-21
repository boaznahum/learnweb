import {connect} from 'react-redux';

import {helloWorld, reset} from "../actions";

import Hello from './../components/Hello';


// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => {

    return {
        message:state.helloWorld.message
    };

};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        onClick: () => dispatch(helloWorld()),
        reset : () => dispatch(reset())
    };
};

const HelloWorld = connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello);

export  default HelloWorld;