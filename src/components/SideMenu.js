import React, { Component } from 'react';
import { observer } from "mobx-react"
// import { action } from "mobx";
import logo from './../logo.svg';
import { actions } from './../actions/referenceData';
import store from './../store/store';

import './App.css';

@observer
class SideMenu extends Component {
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
        {store.countryCodes && store.countryCodes.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {store.countryCodes.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }
        <select class="form-control js-DisplayOn valid">Release</select>
        <select class="form-control js-DisplayOn valid">Release</select>
        <select class="form-control js-DisplayOn valid">Release</select>
      </div>
    );
  }
}

export default SideMenu;
