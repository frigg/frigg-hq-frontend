import React from 'react';
import Router from 'react-router';

import App from './components/app';
import Actions from './actions';
import {BuildListPage, BuildDetailsPage, DeploymentDetailsPage, FourOFourPage, WorkerStatsPage} from './pages';

import './stylus/main.styl';

const {Route, DefaultRoute, NotFoundRoute, Redirect} = Router;

Actions.getUser();

const routes = (
  <Route handler={App} path="/">
    <Route name='worker-stats' path='/workers/' handler={WorkerStatsPage} />
    <Route name='build' path='/:owner/:name/:buildNumber/' handler={BuildDetailsPage} />
    <Route name='deployment' path='/:owner/:name/:buildNumber/preview/' handler={DeploymentDetailsPage} />
    <Route name='builds-for-project' path='/:owner/:name/' handler={BuildListPage} />
    <Route name='builds-for-owner' path='/:owner/' handler={BuildListPage} />

    <Redirect from='/:owner/:name/:buildNumber/preview' to='deployment' />
    <Redirect from='/:owner/:name/:buildNumber' to='build' />
    <Redirect from='/:owner/:name' to='builds-for-project' />
    <Redirect from='/:owner' to='builds-for-owner' />

    <DefaultRoute name="builds" handler={BuildListPage} />
    <NotFoundRoute handler={FourOFourPage}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(
    <Handler params={state.params} query={state.query} />,
    document.getElementById('content')
  );
});
