import React, { Component } from 'react';
import { observer } from "mobx-react"
// import { action } from "mobx";
import logo from './../logo.svg';
import { actions } from '../actions/referenceData';
import referenceStore from '../store/ReferenceStore';


import './App.css';

@observer
export default class SideMenuComponent extends Component {
  constructor(props) {
    super(props);




    this.selectUnselectReferenceData = this.selectUnselectReferenceData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    actions.getAllReferenceData();


  }

  handleInputChange(event) {
    alert(event.target.attributes.getNamedItem('data-propertyname').value);
    var refID;
    if (event.target.attributes.getNamedItem('data-propertyname').value === 'Release')
      refID = event.target.value;
    else
      refID = event.target.attributes.getNamedItem('data-refid').value;

      alert (refID);

    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    this.selectUnselectReferenceData(propertyName, refID, event.target.checked);
    //  console.log(referenceStore.referenceDataDefault.filter(x => x.selected == true));


  }

  // selected/unselect reference data.
  selectUnselectReferenceData(propertyName, refID, value) {
    referenceStore.referenceData.map(ref => {
      if (ref.propertyName == propertyName && ref.id == refID) {
        // alert(value);
        ref.selected = value;
      }
    })
  }

  render() {
    var releaseAdd = { id: 0, name: '(Select a release)' }
    var releaseDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "Release");
    releaseDefault.unshift(releaseAdd);

    var countryCodesDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode");
    var environmentDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "Environment");

    return (
      <div className="App">

        <select onChange={this.handleInputChange} data-propertyname="Release" className="form-control js-DisplayOn valid">
          {releaseDefault.map(ref =>
            <option key={ref.id} value={ref.id} data-propertyname={ref.propertyName} data-refid={ref.id} >{ref.name} {ref.id} </option>
          )};
        </select>

        <select onChange={this.handleInputChange} className="form-control js-DisplayOn valid">
          {referenceStore.cleTypes.map(ref =>
            <option key={ref.id} value={ref.id} data-propertyname={ref.propertyName} data-refid={ref.id}  >{ref.name}</option>
          )};
        </select>

        <table>
          {countryCodesDefault.map(ref =>
            <tr selected="selected" key={ref.id}>
              <td>
                <input type="checkbox" onChange={this.handleInputChange} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} ></input>
              </td><td>{ref.name}</td>
            </tr>
          )}
        </table>

        <div>
          {environmentDefault.map(ref =>
            <div selected="selected" key={ref.id}>
              <input type="checkbox" onChange={this.handleInputChange} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} ></input>
              {ref.name}
            </div>
          )}
        </div>


      </div>
    );
  }
}