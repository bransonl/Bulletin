import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderComponent from './header.component.jsx';

import './header.component.scss'

class HomeComponent extends Component {
  render () {
    return (
      <div>
        <HeaderComponent />
      </div>
    );
  }
}

export default HomeComponent;
