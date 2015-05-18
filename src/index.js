import Bluebird from 'bluebird';
import React from 'react';
import Router from 'react-router';
import App from './components/app';
import BuildList from './components/build-list';
import BuildDetails from './components/build-details';

var {Route, DefaultRoute} = Router;

Bluebird.longStackTraces();

var routes = (
  <Route handler={App} path="/beta/">
    <Route name='build' path='/:owner/:name/:buildNumber' handler={BuildDetails} />
    <Route name='builds-for-project' path='/:owner/:name' handler={BuildList} />
    <Route name='builds-for-owner' path='/:owner' handler={BuildList} />
    <DefaultRoute handler={BuildList} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(
    <Handler params={state.params} query={state.query} />,
    document.getElementById('content')
  );
});
