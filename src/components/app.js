import React from 'react';

import Header from './layout/header';
import Footer from './layout/footer';
import Alerts from './alerts';

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className='wrapper'>
        <Alerts />
        <Header {...this.props}/>
        <div className='content container'>
          {this.props.children}
        </div>
        <Footer {...this.props}/>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};
