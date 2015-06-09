import Bluebird from 'bluebird';
import React from 'react';
import Router from 'react-router';
import App from './components/app';
import BuildList from './components/build-list';
import BuildDetails from './components/build-details';
import DeploymentDetails from './components/deployment-details';
import {FourOFour} from './components/error-pages';
import Action from './actions';

var {Route, DefaultRoute, NotFoundRoute} = Router;

Bluebird.longStackTraces();

Action.getUser();

var routes = (
  <Route handler={App} path="/beta/">
    <Route name='build' path='/beta/:owner/:name/:buildNumber' handler={BuildDetails} />
    <Route name='deployment' path='/beta/:owner/:name/:buildNumber/deployment' handler={DeploymentDetails} />
    <Route name='builds-for-project' path='/beta/:owner/:name' handler={BuildList} />
    <Route name='builds-for-owner' path='/beta/:owner' handler={BuildList} />
    <DefaultRoute name="builds" handler={BuildList} />
    <NotFoundRoute handler={FourOFour}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(
    <Handler params={state.params} query={state.query} />,
    document.getElementById('content')
  );
});
