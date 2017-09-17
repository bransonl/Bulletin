import React, { Component } from 'react';

class HeaderComponent extends Component {
  render () {
    return (
      <div className="w-100 header">
        <div className="h-100 d-inline-block align-middle ml-2">
          <span className="h1">Bulletin</span>
        </div>
        <div className="h-100 d-inline-block align-middle float-right mr-2">
          <i className="fa fa-cog" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default HeaderComponent;
