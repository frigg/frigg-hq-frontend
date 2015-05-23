import React from 'react';
import {RouteHandler} from 'react-router';

import Header from '../components/header';
import Footer from '../components/footer';
import Alerts from '../components/alerts';

export default class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Alerts />
        <Header  {...this.props}/>
        <div className="content container">
          <RouteHandler  {...this.props}/>
        </div>
        <Footer  {...this.props}/>
      </div>
    );
  }
};
