import React, { Component } from 'react';
import { observer } from "mobx-react"
import { Map as iMap } from "immutable";
import { actions } from '../actions/referenceData';

import referenceStore from '../store/ReferenceStore';
import releaseNoteStore from '../store/ReleaseNoteStore';

import { relnotService } from '../service/relnotService';
import commentStore from '../store/CommentStore';

@observer
export class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: '',
            releaseNoteText: '',
            currentReleasenoteId: 0,
            currentReleasenoteKey: '',
            currentReleasenoteValue: '',
            currentCleTypeId: 0
        };
    }

    componentDidMount() {
        releaseNoteStore.getReleaseNotes();
        // let rc = iMap(referenceStore)
        // console.log("Values of observables in class 'referenceClass' ", rc.toJS());
        referenceStore.showNonReleaseInfo = false;
        if ( commentStore.allComments.length===0) actions.getComments();       
    }

    componentDidUpdate() {
    }

    searchReleaseNoteKey = (event) => {

       // if (event.target.value.length<3)return;

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
        this.setState({ currentCleTypeId: parseInt(event.target.attributes.getNamedItem('data-cletypeid').value) });
        this.setState({ currentReleasenoteKey: event.target.attributes.getNamedItem('data-keyname').value });
        this.setState({ currentReleasenoteValue: event.target.attributes.getNamedItem('data-value').value });

        var countrycodeidArray = countrycodeid.split(',');
        var environmentidArray = environmentid.split(',');

        releaseNoteStore.allReleaseNotes.map(r => {
            r.modification = r.releaseNoteId == releasenoteId ? true : false;
        });

        referenceStore.referenceData.map(r => {
            if (r.propertyName != "Release") r.selected = false;
        });

        // set sidemenu to selected
        referenceStore.referenceData.map(r => {
            if (r.propertyName === "CleType") r.selected = r.id == cletypeid ? true : false;
            else if (r.propertyName === "CountryCode") {
                countrycodeidArray.map(c => {
                    if (c == r.id) r.selected = true;
                })
            }
            else if (r.propertyName === "Environment") {
                environmentidArray.map(c => {
                    if (c == r.id) r.selected = true;
                })
            }
        });
    }

    saveReleaseNote = (event) => {
        let releaseNoteId = this.state.currentReleasenoteId;
        var countryCodesSelected = referenceStore.countryCodesDefault.filter(x => x.selected === true).map(a => a.id);
        var environmentsSelected = referenceStore.environmentsDefault.filter(x => x.selected === true).map(a => a.id);
        let releaseID = parseInt(referenceStore.selectedReleaseIDGet);
        let cleTypeID = parseInt(referenceStore.selectedCleTypeIDGet);

        var releaseNoteParms = {};
        console.log('commentid: ' + this.state.commentID);

        releaseNoteParms.ReleaseNoteId = releaseNoteId;
        releaseNoteParms["ReleaseId"] = releaseID;
        releaseNoteParms.CleTypeId = cleTypeID;
        releaseNoteParms["CountryCodeId"] = countryCodesSelected;
        releaseNoteParms["EnvironmentId"] = environmentsSelected;
        releaseNoteParms["KeyName"] = this.state.currentReleasenoteKey;
        releaseNoteParms["Value"] = this.state.currentReleasenoteValue;

        relnotService.updateReleaseNote(releaseNoteParms).then(result => {
            releaseNoteStore.updateReleaseNote(releaseNoteId, releaseNoteParms)
            releaseNoteStore.allReleaseNotes.map(x => { x.modification = false; }); // exit edit mode
            referenceStore.showNonReleaseInfo = false; // hide non release reference divs
        });


        event.preventDefault();
    }

    modifyReleaseNoteKey = (event) => { this.setState({ currentReleasenoteKey: event.target.value }); }
    modifyReleaseNoteValue = (event) => { this.setState({ currentReleasenoteValue: event.target.value }); }

    deleteReleaseNoteKey = (event) => {
        let keyName = event.target.attributes.getNamedItem('data-keyname').value;
        releaseNoteStore.deleteReleaseNoteKey(keyName);
    }

    // To display in grid :
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
    comment = (commentId) => {
        var comment = '';
        commentStore.allComments.map(x => {
            if (commentId == x.id)
                comment = x.name;
        });
        return comment;


    }

    // End to display in grid

    render() {
        return (<div  >
            <div class="form-group">
                <label for="selRelease">Key</label>
                <input type="text" class="form-control" placeholder="Select a release and enter (part of) a key..." onChange={this.searchReleaseNoteKey} ></input>
            </div>
            {
                releaseNoteStore.allReleaseNotes && releaseNoteStore.allReleaseNotes.length > 0 &&
                <table id="releaseNotesList" class="table" class="table table-striped table-bordered table-fixed ">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Type</th>
                            <th>Countries</th>
                            <th>Environments</th>
                            <th>Value</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releaseNoteStore.allReleaseNotes.map(r =>
                            <tr>
                                <td >
                                    {r.modification && <input onChange={this.modifyReleaseNoteKey} defaultValue={r.keyName} class="form-control" />}
                                    {!r.modification && r.keyName}
                                </td>
                                <td >{this.typeName(r.cleTypeId)}</td>
                                <td >{this.countryNames(r.countryCodeId)}</td>
                                <td >{this.environmentNames(r.environmentId)}</td>
                                <td >
                                    {r.modification && <input onChange={this.modifyReleaseNoteValue} defaultValue={r.value} class="form-control" />}
                                    {!r.modification && r.value}
                                </td>
                                <td>{this.comment(r.commentId)}</td>
                                <td >
                                    {!r.modification &&
                                        <React.Fragment>
                                            <button onClick={this.startModifyingReleaseNoteKey}
                                                data-releasenoteid={r.releaseNoteId}
                                                data-cletypeid={r.cleTypeId}
                                                data-countrycodeid={r.countryCodeId}
                                                data-environmentid={r.environmentId}
                                                data-keyname={r.keyName}
                                                data-value={r.value}
                                                title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span
                                                    data-keyname={r.keyName}
                                                    data-value={r.value}
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
                                                        data-keyname={r.keyName}
                                                        data-value={r.value}
                                                        class='test'>&nbsp;&nbsp;Modify  </span></span>
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
                                                data-value={r.value}
                                                title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                <span
                                                    data-cletypeid={r.cleTypeId}
                                                    data-countrycodeid={r.countryCodeId}
                                                    data-environmentid={r.environmentId}
                                                    data-releasenoteid={r.releaseNoteId}
                                                    class="fa fa-save"><span data-releasenoteid={r.releaseNoteId} data-keyname={r.keyName} data-value={r.value} class='test'>&nbsp;&nbsp;Save  </span></span>
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