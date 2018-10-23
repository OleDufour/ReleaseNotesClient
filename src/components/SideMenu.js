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
    this.updateSelectedCountryCode = this.updateSelectedCountryCode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    actions.getAllReferenceData();
  }

  handleInputChange(event) {
    // console.log(event );
    // console.log(event.target );
    // console.log(event.target.attributes.getNamedItem('data-refID').value );
    // console.log(event.target.checked );
    //alert(refID);
    this.updateSelectedCountryCode(event.target.attributes.getNamedItem('data-refID').value, event.target.checked);
    console.log(store.countryCodes[0].id, store.countryCodes[0].selected);
    console.log(store.countryCodes[1].id, store.countryCodes[1].selected);
    console.log(store.countryCodes[2].id, store.countryCodes[2].selected);
    console.log(store.countryCodes[3].id, store.countryCodes[3].selected);
    console.log(store.countryCodes[4].id, store.countryCodes[4].selected);
    console.log(store.countryCodes[5].id, store.countryCodes[5].selected);
  }

  updateSelectedCountryCode(refID, value) {
    store.referenceData.map(ref => {
      if (ref.propertyName == "CountryCode" && ref.id == refID) {
        // alert(value);
        ref.selected = value;
      }
    }
    )
    // for (var i = 0; i < store.referenceData.length; i++) {
    //   if (store.referenceData[i].propertyName === "CountryCode" && store.referenceData[i].id == refID) {
    //     alert(store.referenceData[i].name);
    //     store.referenceData[i].selected = value
    //   }
    // }
    // return store.referenceData;
  }

  //const ul={  list-style: none;}

  render() {

    return (
      <div className="App">

        {store.releases && store.releases.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {store.releases.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }
        {store.cleTypes && store.cleTypes.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {store.cleTypes.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }

        {store.countryCodesDefault && store.countryCodesDefault.length > 0 &&
          <table>
            {store.countryCodesDefault.map(ref =>
              <tr selected="selected" key={ref.id}>
                <td>
                  <input type="checkbox" data-propertyName={ref.propertyName} data-refID={ref.id} defaultChecked={ref.selected} onChange={this.handleInputChange}></input>
                </td><td>{ref.name}</td>
              </tr>
            )}
          </table>
        }

        <div>
          {store.environmentsDefault.map(ref =>
            <div selected="selected" key={ref.id}>

              <input type="checkbox" data-propertyName={ref.propertyName} data-refID={ref.id} defaultChecked={ref.selected} onChange={this.handleInputChange}></input>
              {ref.name}
            </div>
          )}
        </div>


      </div>
    );
  }
}


