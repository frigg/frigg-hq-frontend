import React from 'react';

import {StoreMixin} from '../mixins/page-mixins';
import BuildStore from '../stores/build-store';
import Actions from '../actions';
import BuildListItem from '../components/builds/build-list-item';
import Loading from '../components/loading';

export default React.createClass({
  displayName: "BuildListPage",

  stores: [BuildStore],
  mixins: [StoreMixin],

  propTypes: {
    params: React.PropTypes.object,
  },

  fetch: function() {
    Actions.getBuilds(this.props.params);
  },

  getInitialState: function() {
    return {builds: {}};
  },

  componentDidMount: function() {
    this.setState({builds: BuildStore.getAll(), loading: true});
    this.fetch();
  },

  onChange: function() {
    this.setState({builds: BuildStore.getAll(), loading: BuildStore.isLoading()});
  },

  render: function() {
    if (!this.state.builds.length) return <Loading />;
    const {owner, project} = this.props.params;

    return (
      <div className="build-list">
        {this.state.builds.filter(build => {
          if (project && build.project.name !== project) {
            return false;
          }
          if (owner && build.project.owner !== owner) {
            return false
          }
          return true;
        }).map(build => {
          return <BuildListItem key={build.id} build={build} />;
        })}
      </div>
    );
  },
});
