import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

import {reducer} from './root/reducer';

const store = createStore(reducer);


import {createStore} from "redux";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>



        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
