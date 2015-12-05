import React from 'react';

import Loading from '../components/loading';

export default function connectToStores(Component, stores, getStateFromStores) {
  const StoreConnection = React.createClass({
    getInitialState() {
      return getStateFromStores(this.props);
    },

    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
    },

    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },

    handleStoresChanged() {
      if (this.isMounted()) {
        this.setState(getStateFromStores(this.props));
      }
    },

    render() {
      if (this.state.loading) {
        return <Loading />;
      }
      return <Component {...this.props} {...this.state} />;
    },
  });
  return StoreConnection;
};
