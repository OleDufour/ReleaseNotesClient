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
    this.handleInputChangeSingleSelect = this.handleInputChangeSingleSelect.bind(this);
    this.handleInputChangeMultiSelect = this.handleInputChangeMultiSelect.bind(this);
  }

  componentDidMount() {
    //actions.getAllReferenceData();
    referenceStore.getAllReferenceData();
  }

  handleInputChangeSingleSelect(event) {

    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    alert(propertyName);
    var refID = event.target.value;

    switch (propertyName) {
      case "Release":
        referenceStore.selectedReleaseID = refID; break;
      case "CleType":
        referenceStore.selectedCleTypeID = refID; break;
    }

    //    this.selectUnselectReferenceDataSingleSelect(propertyName, refID);
    //  console.log('referenceDataDefault**', referenceStore.referenceDataDefault);
  }


  handleInputChangeMultiSelect(event) {

    //alert(event.target.attributes.getNamedItem('data-propertyname').value);

    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    var refID = event.target.attributes.getNamedItem('data-refid').value;

    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    referenceStore.selectUnselectReferenceData(propertyName, refID, event.target.checked);

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

  selectUnselectReferenceDataSingleSelect(propertyName, refID) {
    referenceStore.referenceData.map(ref => {
      if (ref.propertyName == propertyName) {
        ref.selected = ref.id == refID ? true : false;
      }
    })
  }



  render() {
    var releaseAdd = { id: 0, name: '' }
    var releaseDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "Release");
    releaseDefault.unshift(releaseAdd);

    var cleTypesDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "CleType");

    var countryCodesDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode");
    var environmentDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "Environment");

    return (
      <div  >

        <select onChange={this.handleInputChangeSingleSelect} data-propertyname="Release" className="form-control js-DisplayOn valid">
          {releaseDefault.map(ref =>
            <option key={ref.id} value={ref.id} data-propertyname={ref.propertyName} data-refid={ref.id} >{ref.name} {ref.selected} </option>
          )};
        </select>

        <select onChange={this.handleInputChangeSingleSelect} data-propertyname="CleType" className="form-control js-DisplayOn valid">
          {cleTypesDefault.map(ref =>
            <option key={ref.id} value={ref.id} data-propertyname={ref.propertyName} data-refid={ref.id}  >{ref.name} + {ref.selected}</option>
          )};
        </select>

        <table>
          {countryCodesDefault.map(ref =>
            <tr selected="selected" key={ref.id}>
              <td>
                <input type="checkbox" onChange={this.handleInputChangeMultiSelect} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} ></input>
              </td><td>{ref.name}</td>
            </tr>
          )}
        </table>

         <fieldset  >
        <legend><h5>Environments</h5></legend>
          {environmentDefault.map(ref =>
            <div selected="selected" key={ref.id}>
              <input type="checkbox" onChange={this.handleInputChangeMultiSelect} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} ></input>
              {ref.name}
            </div>
          )}
        </fieldset>


      </div>
    );
  }
}