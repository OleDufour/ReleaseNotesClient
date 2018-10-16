import React, { Component } from 'react';
import { observer } from "mobx-react"
// import { action } from "mobx";
import logo from './../logo.svg';
import { actions } from './../actions/referenceData';
import store from './../store/store';
import Reference from './ReferenceComp';
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
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
    );
  }
}

export default App;
