import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import 'bootstrap/scss/bootstrap.scss';
import './stylesheets/styles.scss';

import rootEpic from './epics';
import rootReducer from './reducers';

import LandingComponent from './components/landing/landing.component.jsx';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {['/', '/register'].map(path =>
          <Route path={path} component={LandingComponent} />)}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
