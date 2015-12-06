import React from 'react';
import Router from 'react-router';
import {render} from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Actions from './actions';
import UserWrapper from './components/user-wrapper';
import routes from './routes';
import './stylus/main.styl';

let history = createBrowserHistory()
Actions.getUser();

render(
  <UserWrapper>
    <Router history={history}>
      {routes}
    </Router>
  </UserWrapper>,
  document.getElementById('content')
)
