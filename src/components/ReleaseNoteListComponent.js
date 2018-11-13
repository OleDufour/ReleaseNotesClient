import React, { Component } from 'react';
import { observer } from "mobx-react"
import { Map as iMap } from "immutable";
import { actions } from '../actions/referenceData';
import rn from '../store/ReleaseNoteStore';
import referenceStore from '../store/ReferenceStore';
import releaseNoteStore from '../store/ReleaseNoteStore';

import { relnotService } from '../service/relnotService';



@observer
export class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: '',
            releaseNoteText: '',
            currentReleasenoteId: 0,
            currentReleasenoteValue: ''
        };



    }

    componentDidMount() {
        // alert('list did mount')
        releaseNoteStore.getReleaseNotes();


        let rc = iMap(referenceStore)
        console.log("Values of observables in class 'referenceClass' ", rc.toJS());
        referenceStore.showNonReleaseInfo = false;



    }

    componentDidUpdate() {
    }

    searchReleaseNoteKey = (event) => {
        referenceStore.showNonReleaseInfo = false;
        console.log('commentid: ' + this.state.commentID);

        let releaseID = parseInt(referenceStore.selectedReleaseIDGet);
        let key = event.target.value;

        let releaseNoteParms = {};
        releaseNoteParms["ReleaseId"] = releaseID;
        releaseNoteParms["KeyName"] = key;

        console.log('$$$$$ releaseNoteSearchParms: ', releaseNoteParms);
        releaseNoteStore.searchReleaseNotes(releaseNoteParms);
        event.preventDefault();
    }

    // click on Modify button
    startModifyingReleaseNoteKey = (event) => {
        let keyName = event.target.attributes.getNamedItem('data-keyname').value;
        let releasenoteId = event.target.attributes.getNamedItem('data-releasenoteid').value;
        let countrycodeid = event.target.attributes.getNamedItem('data-countrycodeid').value;
        let environmentid = event.target.attributes.getNamedItem('data-environmentid').value;




        this.setState({ currentReleasenoteid: event.target.attributes.getNamedItem('data-releasenoteid').value });
        alert(releasenoteId)
        referenceStore.showNonReleaseInfo = true;
        // alert(releaseNoteStore.allReleaseNotes[1].test);
        //releaseNoteStore.allReleaseNotes[1].test = 'def'; 

        var countrycodeidArray = countrycodeid.split(',');
        var environmentidArray = environmentid.split(',');

        releaseNoteStore.allReleaseNotes.map(r => {
            if (r.releaseNoteId == releasenoteId)
                r.modification = true;
            else
                r.modification = false;
        });


        referenceStore.referenceData.map(r => {
            if (r.propertyName != "Release") {
                r.selected = false;
            }
        });


        // set countrycodes to selected
        referenceStore.referenceData.map(r => {
            if (r.propertyName === "CleType") {
                environmentidArray.map(c => {
                    if (c == r.id) {
                        r.selected = true;
                    }
                })
            }
            else if (r.propertyName === "CountryCode") {
                countrycodeidArray.map(c => {
                    if (c == r.id) {
                        r.selected = true;
                    }
                })
            }
            else if (r.propertyName === "Environment") {
                environmentidArray.map(c => {
                    if (c == r.id) {
                        r.selected = true;
                    }
                })
            }
        });



    }

    modifyReleaseNoteValue = (event) => {

    }




    deleteReleaseNoteKey = (event) => {
        let keyName = event.target.attributes.getNamedItem('data-keyname').value;
        alert(keyName);
        releaseNoteStore.deleteReleaseNoteKey(keyName);
    }




    render() {
        return (<div  >
            <div class="form-group">
                <label for="selRelease">Key</label>
                <input type="text" class="form-control" placeholder="Select a release and enter (part of) a key..." onChange={this.searchReleaseNoteKey} ></input>
            </div>
            {
                releaseNoteStore.allReleaseNotes && releaseNoteStore.allReleaseNotes.length > 0 &&
                <table class="table" class="table table-striped table-bordered">
                    <tbody>
                        {releaseNoteStore.allReleaseNotes.map(r =>
                            <tr>
                                {/* <div selected="selected" key={r.id}> */}
                                <td>
                                    {r.releaseNoteId}--
                                    {r.modification.toString()}
                                    {r.keyName}
                                    {r.releaseNoteId}
                                    environment: {r.environmentId}-
                                    country: {r.countryCodeId} -
                                    cletypeid : {r.cleTypeId} -
                                 </td>
                                <td>
                                    {r.modification && <input onChange={this.modifyReleaseNoteValue} defaultValue={r.value} class="form-control" />}
                                    {!r.modification && r.value}
                                </td>
                                <td>
                                    {!r.modification &&
                                        <React.Fragment>
                                            <button onClick={this.startModifyingReleaseNoteKey} data-releasenoteid={r.releaseNoteId} data-countrycodeid={r.countryCodeId}
                                                data-environmentid={r.environmentId}
                                                data-keyname={r.keyName} title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span data-keyname={r.keyName} data-countrycodeid={r.countryCodeId}
                                                    data-environmentid={r.environmentId}
                                                    data-releasenoteid={r.releaseNoteId} class="fa fa-pencil"><span data-countrycodeid={r.countryCodeId} data-environmentid={r.environmentId} data-releasenoteid={r.releaseNoteId} data-keyname={r.keyName} class='test'>&nbsp;&nbsp;Modify  </span></span>
                                            </button>  &nbsp;&nbsp;
                                        </React.Fragment>
                                    }
                                    {r.modification &&
                                        <React.Fragment>
                                            <button onClick={this.startModifyingReleaseNoteKey} data-countrycodeid={r.countryCodeId} data-keyname={r.keyName} title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span data-keyname={r.keyName} class="fa fa-save"><span data-keyname={r.keyName} class='test'>&nbsp;&nbsp;Save  </span></span>
                                            </button> &nbsp;&nbsp;
                                        </React.Fragment>
                                    }

                                    <button data-keyname={r.keyName} onClick={this.deleteReleaseNoteKey} title="Supprimer" className="btnGrid btn-primary btn-warning  "  >
                                        <span data-keyname={r.keyName} class="fa fa-trash"><span data-keyname={r.keyName} class='test'>&nbsp;&nbsp;Delete </span> </span>
                                    </button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div >);
    }
}
export default ListComponent;

