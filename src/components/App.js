import React, { Component } from 'react';
import { observer } from "mobx-react"
import logo from './../logo.svg';
import { actions } from './../actions/referenceData';

// components
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import Add from './Add';
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
        <NavBar />
        <div class="row">
          <div class="col-md-2">
            <SideMenu />
          </div>
          <div class="col-md-10">
            <Add />
            <div>
              {/* <img src={logo} className="App-logo" alt="logo" />*/}
              <code>o Releasenotes</code>
            </div>
            <p className="App-intro">
              <code>src/App.js</code>
            </p>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
