import React, { Component } from 'react';
import { BrowserRouter as    Nav, NavLink } from "react-router-dom";
import referenceStore from '../store/ReferenceStore';
//import AddComponent from './AddComponent';
//import CommentComponent from './CommentsComponent';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

  }

    addClicked=(event)=>{
alert('test');
referenceStore.    referenceData.map((x)=>{x.selected=true; return x;});
 
 
  }

  render() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Release note manager</a>
      <ul className="navbar-nav">
        <NavLink exact={true} className="nav-link" activeClassName='nav-item active'  onClick={this.addClicked} to='/'>Add</NavLink>
        <NavLink exact={true} className="nav-link" activeClassName='nav-item active' to='/comment'>Comment</NavLink>
        <NavLink exact={true} className="nav-link" activeClassName='nav-item active' to='/preview'>Preview</NavLink>
        <NavLink exact={true} className="nav-link" activeClassName='nav-item active' to='/admin'>Admin</NavLink>
      </ul>
    </nav>;
  }
}


export default NavBarComponent;