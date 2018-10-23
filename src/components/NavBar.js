import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddComponent from './AddComponent';
import CommentComponent from './CommentsComponent';

class NavBar extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    console.log(this.props);

  }

  render() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Release note manager</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>


    
      
        <ul className="navbar-nav mr-auto">
          <li>
            <Link to="/"></Link>
          </li>
          <li>
            <Link to="/add">Add</Link>&nbsp;&nbsp;&nbsp;
          </li>
          <li>
            <Link to="/comment">Comment</Link>
          </li>
        </ul>

        
      
     


    </nav>;
  }
}


export default NavBar;