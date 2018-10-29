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




    this.updateSelectedCountryCode = this.updateSelectedCountryCode.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    actions.getAllReferenceData();


  }

  handleInputChange(event) {
    this.updateSelectedCountryCode(event.target.attributes.getNamedItem('data-refID').value, event.target.checked);
    console.log(referenceStore.countryCodes[0].id, referenceStore.countryCodes[0].selected);
    console.log(referenceStore.countryCodes[1].id, referenceStore.countryCodes[1].selected);
    console.log(referenceStore.countryCodes[2].id, referenceStore.countryCodes[2].selected);
    console.log(referenceStore.countryCodes[3].id, referenceStore.countryCodes[3].selected);
    console.log(referenceStore.countryCodes[4].id, referenceStore.countryCodes[4].selected);
    console.log(referenceStore.countryCodes[5].id, referenceStore.countryCodes[5].selected);

    console.log('this.countryCodesDefault');
    console.log(this.countryCodesDefault);

  }

  updateSelectedCountryCode(refID, value) {
    referenceStore.referenceData.map(ref => {
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
    var countryCodesDefault = referenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode");
    console.log(countryCodesDefault.filter(x => x.selected === true).length);


    return (
      <div className="App">
        {referenceStore.releases && referenceStore.releases.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {referenceStore.releases.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }
        {referenceStore.cleTypes && referenceStore.cleTypes.length > 0 &&
          <select className="form-control js-DisplayOn valid">
            {referenceStore.cleTypes.map(ref =>
              <option key={ref.id} value={ref.id}>{ref.name}</option>
            )};
           </select>
        }

        {/* {referenceStore.countryCodesDefault && referenceStore.countryCodesDefault.length > 0 &&
          <table>
            {referenceStore.countryCodesDefault.map(ref =>
              <tr selected="selected" key={ref.id}>
                <td>
                  <input type="checkbox" data-propertyName={ref.propertyName} data-refID={ref.id} defaultChecked={ref.selected} onChange={this.handleInputChange}></input>
                </td><td>{ref.name}</td>
              </tr>
            )}
          </table>
        }
      */}

        nieuw :
        todo : @computed get countryCodesDefault() weghalen
 {countryCodesDefault && countryCodesDefault.length > 0 &&
          <table>
            {countryCodesDefault.map(ref =>
              <tr selected="selected" key={ref.id}>
                <td>
                  <input type="checkbox" data-propertyName={ref.propertyName} data-refID={ref.id} defaultChecked={ref.selected} onChange={this.handleInputChange}></input>
                </td><td>{ref.name}</td>
              </tr>
            )}
          </table>
        }


        <div>
          {referenceStore.environmentsDefault.map(ref =>
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


