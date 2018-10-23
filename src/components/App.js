import React, { Component } from 'react';
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './../logo.svg';
import { actions } from './../actions/referenceData';

import AddComponent from './AddComponent';
import CommentComponent from './CommentsComponent';
// components
import NavBar from './NavBar';
import SideMenu from './SideMenu';

import './App.css';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { refs: [] };
  }

  componentDidMount() {
    // actions.getAllReferenceData();
  }


  render() {

    return (
      <div class="container-fluid">
        <Router>
          <div>
            <NavBar />
            <br/>
            <div class="row">
              <div class="col-md-2">
                <SideMenu />
              </div>
              <div class="col-md-6">
                <Route path="/add" component={AddComponent} />
                <Route path="/comment" component={CommentComponent} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
