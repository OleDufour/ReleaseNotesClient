import React, { Component } from 'react';
import { observer } from "mobx-react"
// import { action } from "mobx";
import logo from './../logo.svg';
import { actions } from './../actions/referenceData';
import store from './../store/store';

import './App.css';

@observer
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { refs: [] };
  }

  componentDidMount() {
    actions.getAllReferenceData();
  }

  handleInputChange(event) {
    console.log(store);
console.log(     store.countryCodes[0].name="abc");
  }


  render() {

    return (
      <div className="App">

        todo HOC element hier voor maken
        {store.releases && store.releases.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {store.releases.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }
        {store.countryCodes && store.countryCodes.length > 0 &&
          <table multiple  >
            {store.countryCodes.map(ref =>
              <tr selected="selected" key={ref.id} ><td><input type="checkbox" defaultChecked= {ref.selected} onChange={this.handleInputChange}></input></td><td>{ref.id}{ref.name}</td></tr>
            )};
        
          </table>
        }
        {/*   {store.countryCodes && store.countryCodes.length > 0 &&
          <table multiple className="form-control js-DisplayOn valid">
            {store.countryCodes.map(ref =>
              <tr selected="selected" key={ref.id} ><td><input type="checkbox" checked></input></td><td>{ref.id}{ref.name}</td></tr>
            )};
            <input type="checkbox" defaultChecked={true} onChange={this.handleChangeChk} />
           </table>
        }*/}
        {/* {store.environments && store.environments.length > 0 &&
          <select multiple className="form-control js-DisplayOn valid">
            {store.environments.map(ref =>
              <option selected="selected" key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }
         {store.cleTypes && store.cleTypes.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {store.cleTypes.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }          */}
      </div>
    );
  }
}


