import React, { Component } from 'react';
import { observer } from "mobx-react"
// import { action } from "mobx";
import logo from './../logo.svg';
import { actions } from './../actions/referenceData';
import store from './../store/store';
import Reference from './ReferenceComp';
import SideMenu from './SideMenu';
import NavBar from './NavBar';
import './App.css';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { refs: [] };
  }

  componentDidMount() {
    actions.getAllReferenceData();
  }


  render() {

    return (
      <div class="container-fluid">
        <NavBar />
        <div class="row">
          <div class="col-md-3">
            <SideMenu />
          </div>
          <div class="col-md-9">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" />*/}
              <h1 className="App-title">o Releasenotes</h1>
            </header>
            <Reference />
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.jjjjj hhh
        </p>
            {store.referenceData && store.referenceData.length > 0 &&
              <select name='abc'>
                {store.referenceData.map(ref =>
                  <option key={ref.id} value={ref.id}>{ref.value}</option>
                )};
        </select>
            }
          </div>
        </div>
      </div>





    );
  }
}

export default App;
