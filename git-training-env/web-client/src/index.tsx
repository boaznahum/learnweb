import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {reducer, rootInitialState} from './root/reducer';

const store = createStore(reducer, rootInitialState, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>



        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
