import React, { Component } from 'react';
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './../logo.svg';
import { actions } from './../actions/referenceData';

import AddComponent from './AddComponent';
import CommentComponent from './CommentsComponent';
// components
import NavBarComponent from './NavBarComponent';
import SideMenuComponent from './SideMenuComponent';

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
            <NavBarComponent />
            <br/>
            <div class="row">
              <div class="col-md-2">
                <SideMenuComponent />
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
