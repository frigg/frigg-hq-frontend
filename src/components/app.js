import React from 'react';
import {RouteHandler} from 'react-router';
import {Map} from 'immutable';

import UserStore from '../stores/user-store';
import Header from '../components/header';
import Footer from '../components/footer';
import Alerts from '../components/alerts';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {user: Map({is_anonymous: true})};
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange.bind(this));
    this.setState({user: UserStore.getCurrentUser()});
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({user: UserStore.getCurrentUser()});
  }

  render() {
    return (
      <div className="wrapper">
        <Alerts />
        <Header user={this.state.user} {...this.props}/>
        <div className="content container">
          <RouteHandler  {...this.props}/>
        </div>
        <Footer  {...this.props}/>
      </div>
    );
  }
};
