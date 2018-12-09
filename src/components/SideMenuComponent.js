import React, { Component } from 'react';
import { observer } from "mobx-react"


import referenceStore from '../store/ReferenceStore';
import './App.css';
import commentStore from '../store/CommentStore';


@observer
export default class SideMenuComponent extends Component {
  constructor(props) {
    super(props);

    this.selectUnselectReferenceData = this.selectUnselectReferenceData.bind(this);
  }

  componentDidMount() {

    referenceStore.getAllReferenceData();

    // alert(referenceStore.showNonReleaseInfo);
  }

  componentDidUpdate() {
  }

  handleInputChangeSingleSelect = (event) => {
    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    // alert(propertyName);
    var refID = event.target.value;

    //alert(refID)
    switch (propertyName) {
      case "Release":
        referenceStore.selectedReleaseID = refID; break;
      case "CleType":
        referenceStore.selectedCleTypeID = refID; break;
      case "Comment":
        alert(refID);
        commentStore.updateSelectedCommentId(refID); break;
    }
  }


  handleInputChangeMultiSelect = (event) => {
    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    var refID = event.target.attributes.getNamedItem('data-refid').value;
    var propertyName = event.target.attributes.getNamedItem('data-propertyname').value;
    referenceStore.selectUnselectReferenceData(propertyName, refID, event.target.checked);
  }

  // selected/unselect reference data.
  selectUnselectReferenceData(propertyName, refID, value) {
    //  alert('clicked')
    referenceStore.referenceData.map(ref => {
      if (ref.propertyName == propertyName && ref.id == refID) {
        //  alert(value);
        ref.selected = value;
      }
    })
  }

  selectUnselectReferenceDataSingleSelect(propertyName, refID) {
    alert(propertyName);
    referenceStore.referenceData.map(ref => {
      if (ref.propertyName == propertyName) {

        ref.selected = ref.id == refID ? true : false;
      }
    })
  }


  render() {
    //  alert ('sidemenu component render')
    return (
      <div>
        <div class="form-group">
          <label for="selRelease">Release</label>
          <select id="selRelease" onChange={this.handleInputChangeSingleSelect} data-propertyname="Release" className="form-control js-DisplayOn valid">
            {referenceStore.releases.map(ref =>
              <option key={ref.id} defaultValue={ref.id} value={ref.id} data-refid={ref.id} >{ref.name}   </option>
            )};
         </select>
        </div>

        {referenceStore.showNonReleaseInfo &&
          <React.Fragment>
            <div class="form-group">
              <label for="selCleType">Type</label>
              <select id="selCleType" onChange={this.handleInputChangeSingleSelect} data-propertyname="CleType" className="form-control js-DisplayOn valid" >
                {referenceStore.cleTypes.map(ref =>
                  <option key={ref.id} selected={ref.selected} data-selected={ref.selected} defaultValue={ref.id} value={ref.id} data-refid={ref.id}  >{ref.name}  </option>
                )}
              </select>
            </div>

            <div class="form-group">
              <table>
                <label >Countries</label>
                {referenceStore.countryCodesDefault.map(ref =>
                  <tr selected="selected" key={ref.id}>
                    <td>
                      <input type="checkbox" onChange={this.handleInputChangeMultiSelect} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} checked={ref.selected} ></input>
                      &nbsp;&nbsp;{ref.name}
                    </td>
                  </tr>
                )}
              </table>
            </div>

            <div class="form-group">
              <table>
                <label >Environments</label>
                {referenceStore.environmentsDefault.map(ref =>
                  <tr selected="selected" key={ref.id}>
                    <td>
                      <input type="checkbox" onChange={this.handleInputChangeMultiSelect} data-propertyname={ref.propertyName} data-refid={ref.id} defaultChecked={ref.selected} checked={ref.selected} ></input>
                      &nbsp;&nbsp;{ref.name}   </td>
                  </tr>
                )}
              </table>
            </div>

            <div class="form-group">
              <label for="selComment">Comments</label>
              <select id="selComment" onChange={this.handleInputChangeSingleSelect} data-propertyname="Comment" className="form-control js-DisplayOn valid">
                {  commentStore.comments  && commentStore.comments.map(ref =>
                  <option key={ref.id} selected={ref.selected} data-selected={ref.selected}  defaultValue={ref.id} value={ref.id} data-refid={ref.id} >{ref.name} {ref.selected }  </option>
                )};
               </select>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}