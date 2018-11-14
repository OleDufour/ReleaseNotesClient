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
            currentReleasenoteKey: '',
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
        referenceStore.showNonReleaseInfo = true;

        let releasenoteId = event.target.attributes.getNamedItem('data-releasenoteid').value;
        let cletypeid = event.target.attributes.getNamedItem('data-cletypeid').value;
        let countrycodeid = event.target.attributes.getNamedItem('data-countrycodeid').value;
        let environmentid = event.target.attributes.getNamedItem('data-environmentid').value;

        this.setState({ currentReleasenoteId: event.target.attributes.getNamedItem('data-releasenoteid').value });

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

        // set sidemenu to selected
        referenceStore.referenceData.map(r => {
            if (r.propertyName === "CleType") {
                if (r.id == cletypeid)
                    r.selected = true;
                else
                    r.selected = false;
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

    saveReleaseNote = (event) => {


        let releaseNoteId = this.state.currentReleasenoteId;
        // alert('releaseNoteId ' + releaseNoteId);
        // alert(referenceStore.cleTypes.filter(x => x.selected === true));
        // alert(referenceStore.countryCodesDefault.filter(x => x.selected === true));
        // alert(referenceStore.environmentsDefault.filter(x => x.selected === true));
        // alert(this.state.currentReleasenoteValue);

        var countryCodesSelected = referenceStore.countryCodesDefault.filter(x => x.selected === true).map(a => a.id);
        var environmentsSelected = referenceStore.environmentsDefault.filter(x => x.selected === true).map(a => a.id);
        let releaseID = parseInt(referenceStore.selectedReleaseIDGet);
        let cleTypeID = parseInt(referenceStore.selectedCleTypeIDGet);
        alert('cleTypeID ' + cleTypeID)
        var releaseNoteLight = {};
        console.log('commentid: ' + this.state.commentID);

        releaseNoteLight.ReleaseNoteId = releaseNoteId;
        releaseNoteLight["ReleaseId"] = releaseID;
        releaseNoteLight.CleTypeId = cleTypeID;
        releaseNoteLight["CountryCodeId"] = countryCodesSelected;
        releaseNoteLight["EnvironmentId"] = environmentsSelected;
        releaseNoteLight["KeyName"] = this.state.currentReleasenoteKey;
        releaseNoteLight["Value"] = this.state.currentReleasenoteValue;
        //   releaseNoteLight.CommentId = this.state.commentID;

        relnotService.postReleaseNotes(releaseNoteLight);
        event.preventDefault();

    }

    modifyReleaseNoteKey = (event) => {
        this.setState({ currentReleasenoteKey: event.target.value });


    }
    modifyReleaseNoteValue = (event) => {
        this.setState({ currentReleasenoteValue: event.target.value });
    }

    deleteReleaseNoteKey = (event) => {
        let keyName = event.target.attributes.getNamedItem('data-keyname').value;
        alert(keyName);
        releaseNoteStore.deleteReleaseNoteKey(keyName);
    }



    typeName = (cleTypeId) => {
        var cleType = '';
        referenceStore.cleTypes.map(x => {
            if (cleTypeId == x.id)
                cleType = x.name;
        });
        return cleType;
    }
    countryNames = (countryCodeId) => {
        if (referenceStore.countryCodesDefault.length == countryCodeId.length) return '(All)';
        var countries = '';
        referenceStore.countryCodesDefault.map(x => {
            if (countryCodeId.includes(x.id))
                countries += x.name + ', ';
        });
        return countries.trim().slice(0, -1);
    }
    environmentNames = (environmentId) => {
        if (referenceStore.environmentsDefault.length == environmentId.length) return '(All)';
        var environments = '';
        referenceStore.environmentsDefault.map(x => {
            if (environmentId.includes(x.id))
                environments += x.name + ', ';
        });
        return environments.trim().slice(0, -1);
    }


    render() {
        return (<div  >
            <div class="form-group">
                <label for="selRelease">Key</label>
                <input type="text" class="form-control" placeholder="Select a release and enter (part of) a key..." onChange={this.searchReleaseNoteKey} ></input>
            </div>
            {
                releaseNoteStore.allReleaseNotes && releaseNoteStore.allReleaseNotes.length > 0 &&
                <table class="table" class="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Type</th>
                            <th>Countries</th>
                            <th>Environments</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releaseNoteStore.allReleaseNotes.map(r =>
                            <tr>
                                {/* <div selected="selected" key={r.id}> */}
                                <td>
                                    {r.modification && <input onChange={this.modifyReleaseNoteKey} defaultValue={r.keyName} class="form-control" />}
                                    {!r.modification && r.keyName}
                                </td>
                                <td>{this.typeName(r.cleT_ypeId)}</td>
                                <td>{this.countryNames(r.countryCodeId)}</td>
                                <td>{this.environmentNames(r.environmentId)}</td>
                                <td>
                                    {r.modification && <input onChange={this.modifyReleaseNoteValue} defaultValue={r.value} class="form-control" />}
                                    {!r.modification && r.value}
                                </td>
                                <td>
                                    {!r.modification &&
                                        <React.Fragment>
                                            <button onClick={this.startModifyingReleaseNoteKey}
                                                data-releasenoteid={r.releaseNoteId}
                                                data-cletypeid={r.cleTypeId}
                                                data-countrycodeid={r.countryCodeId}
                                                data-environmentid={r.environmentId}
                                                data-keyname={r.keyName} title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span
                                                    data-keyname={r.keyName}
                                                    data-cletypeid={r.cleTypeId}
                                                    data-countrycodeid={r.countryCodeId}
                                                    data-environmentid={r.environmentId}
                                                    data-releasenoteid={r.releaseNoteId}
                                                    class="fa fa-pencil">
                                                    <span
                                                        data-cletypeid={r.cleTypeId}
                                                        data-countrycodeid={r.countryCodeId}
                                                        data-environmentid={r.environmentId}
                                                        data-releasenoteid={r.releaseNoteId}
                                                        data-keyname={r.keyName} class='test'>&nbsp;&nbsp;Modify  </span></span>
                                            </button>  &nbsp;&nbsp;
                                        </React.Fragment>
                                    }
                                    {r.modification &&
                                        <React.Fragment>
                                            <button onClick={this.saveReleaseNote}
                                                data-cletypeid={r.cleTypeId}
                                                data-countrycodeid={r.countryCodeId}
                                                data-releasenoteid={r.releaseNoteId}
                                                data-keyname={r.keyName}
                                                title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span
                                                    data-cletypeid={r.cleTypeId}
                                                    data-countrycodeid={r.countryCodeId}
                                                    data-environmentid={r.environmentId}
                                                    data-releasenoteid={r.releaseNoteId}
                                                    class="fa fa-save"><span data-releasenoteid={r.releaseNoteId} data-keyname={r.keyName} class='test'>&nbsp;&nbsp;Save  </span></span>
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

