import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import {BuildListPage, BuildDetailsPage, DeploymentDetailsPage, FourOFourPage, WorkerStatsPage} from './pages';

import './stylus/main.styl';

export default (
  <Route component={App} path="/">
    <IndexRoute component={BuildListPage}/>
    <Route name='worker-stats' path='/workers/' component={WorkerStatsPage} />
    <Route name='build' path='/:owner/:name/:buildNumber/' component={BuildDetailsPage} />
    <Route name='deployment' path='/:owner/:name/:buildNumber/preview/' component={DeploymentDetailsPage} />
    <Route name='builds-for-project' path='/:owner/:name/' component={BuildListPage} />
    <Route name='builds-for-owner' path='/:owner/' component={BuildListPage} />

    <Route path="*" component={FourOFourPage}/>
  </Route>
);
