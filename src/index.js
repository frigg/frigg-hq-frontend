import Bluebird from 'bluebird';
import React from 'react';
import Router from 'react-router';

import App from './components/app';
import BuildList from './components/build-list';
import BuildDetails from './components/build-details';
import DeploymentDetails from './components/deployment-details';
import {FourOFour} from './components/error-pages';
import Action from './actions';

var {Route, DefaultRoute, NotFoundRoute, Redirect} = Router;

//Bluebird.longStackTraces();

Action.getUser();

var routes = (
  <Route handler={App} path="/">
    <Route name='build' path='/:owner/:name/:buildNumber/' handler={BuildDetails} />
    <Route name='deployment' path='/:owner/:name/:buildNumber/preview/' handler={DeploymentDetails} />
    <Route name='builds-for-project' path='/:owner/:name/' handler={BuildList} />
    <Route name='builds-for-owner' path='/:owner/' handler={BuildList} />

    <Redirect from='/:owner/:name/:buildNumber/preview' to='deployment' />
    <Redirect from='/:owner/:name/:buildNumber' to='build' />
    <Redirect from='/:owner/:name' to='builds-for-project' />
    <Redirect from='/:owner' to='build-for-owner' />

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
