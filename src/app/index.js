import React, {
	Component
} from 'react';
import {
	render
} from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
	syncHistoryWithStore
} from 'react-router-redux'
import {
	Router,
	browserHistory
} from 'react-router'
import configureStore from './stores/configureStore'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

import routes from './routes';
import 'font-awesome/css/font-awesome.min.css';
import 'nprogress/nprogress.css';
import '../www/css/main.less'

let rootElement = document.getElementById('react-content')

render(
	<Provider store={store}>
    <Router history={history} routes={routes}></Router>
  </Provider>,
	rootElement
);