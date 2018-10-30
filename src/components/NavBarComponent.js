import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//import AddComponent from './AddComponent';
//import CommentComponent from './CommentsComponent';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

   // const { dispatch } = this.props;
    console.log(this.props);

  }

  render() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Release note manager</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/"></Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/add">Add</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/comment">Comments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/comment">List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/comment">Preview</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/comment">Admin</Link>
        </li>
      </ul>
    </nav>;
  }
}


export default NavBarComponent;