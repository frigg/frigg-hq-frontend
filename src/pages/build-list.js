import React from 'react';

import BuildStore from '../stores/build-store';
import strings from '../strings';
import Actions from '../actions';
import BuildListItem from '../components/builds/build-list-item';
import Loading from '../components/loading';


export default class BuildListPage extends React.Component {

  constructor() {
    super();
    this.state = {builds: [], loading: false};
  }

  fetch() {
    if (this.props.params.owner && this.props.params.name) {
      Actions.getBuilds(this.props.params.owner + '/' + this.props.params.name);
    } else if (this.props.params.owner) {
      Actions.getBuilds(this.props.params.owner);
    } else {
      Actions.getBuilds();
    }
    Actions.addAlert({
      message: strings('LOADING'),
      iconClasses: 'fa fa-spinner fa-pulse',
      key: 'loading-data',
    });
  }

  componentDidMount() {
    BuildStore.addChangeListener(this._onChange.bind(this));
    this.setState({builds: BuildStore.getAll(), loading: true});
    this.fetch();
  }

  componentWillUnmount() {
    BuildStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({builds: BuildStore.getAll(), loading: BuildStore.isLoading()});
  }

  render() {
    if (!this.state.builds.size) return (<Loading />);
    const owner = this.props.params.owner;
    const project = this.props.params.name;

    const builds = this.state.builds.map(build => {
      if (owner && build.get('project').owner !== owner) {
        return false;
      }

      if (project && build.get('project').name !== project) {
        return false;
      }

      return (
        <BuildListItem build={build} />
      );
    });

    if (this.state.loading) {
      Actions.addAlert({
        message: strings('LOADING'),
        iconClasses: 'fa fa-spinner fa-pulse',
        key: 'loading-data',
      });
    } else {
      Actions.removeAlert('loading-data');
    }

    clearTimeout(this.fetchTimeout);
    this.fetchTimeout = setTimeout(this.fetch.bind(this), 120000);

    return (
      <div>
        <div className="build-list">
          {builds}
        </div>
      </div>
    );
  }
}

BuildListPage.propTypes = {
  params: React.PropTypes.object,
};
