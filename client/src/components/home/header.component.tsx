import * as React from "react";

import "./header.component.scss";

class HeaderComponent extends React.Component {
  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Bulletin</a>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <form className="form-inline my-2 my-lg-0 search-bar">
            <input type="text" className="form-control mr-sm-2" placeholder="Search" aria-label="Search"/>
            <button type="submit" className="btn btn-outline-success my-2 my-sm-0">Search</button>
          </form>
          <ul className="navbar-nav justify-content-end ml-auto">
          </ul>
        </div>
      </nav>
    );
  }
}

export default HeaderComponent;
