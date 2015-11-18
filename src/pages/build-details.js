/* eslint-disable react/no-multi-comp */
import _ from 'lodash';
import React from 'react';

import {StoreMixin} from '../mixins/page-mixins';
import BuildStore from '../stores/build-store';
import UserStore from '../stores/user-store';
import Actions from '../actions';
import Loading from '../components/loading';
import BuildDetails from '../components/builds/build-details';
import ErrorBuildDetails from '../components/builds/error-build-details';

export default React.createClass({
  displayName: 'BuildDetailsPage',

  stores: [BuildStore],
  mixins: [StoreMixin],

  propTypes: {
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return _.assign({
      loading: false,
    }, this.get());
  },

  get: function() {
    const {owner, name, buildNumber} = this.props.params;
    return {
      build: BuildStore.getBuild(owner, name, buildNumber),
      user: UserStore.getCurrentUser(),
      loading: BuildStore.isLoading(),
    };
  },

  fetch: function() {
    Actions.getBuild(this.props.params);
  },

  componentDidMount: function() {
    this.setState(this.get());
    this.setState({loading: true});
    this.fetch();
  },

  onChange: function() {
    this.setState(this.get());
  },

  render: function() {
    const {build} = this.state;

    if (!build) {
      return <Loading />;
    }

    if (build.color === 'gray') {
      return <ErrorBuildDetails build={build} />;
    }

    if (!build.result || build.result.still_running) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(this.fetch, 2000);
    }

    return <BuildDetails {...this.state} location={this.props.location} />;
  },
});
