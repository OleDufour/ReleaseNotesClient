import React, { Component } from 'react';
import { observer } from "mobx-react"
import { Map as iMap } from "immutable";
import { actions } from '../actions/referenceData';
import rn from '../store/ReleaseNoteStore';
import referenceStore from '../store/ReferenceStore';
import releaseNoteStore from '../store/ReleaseNoteStore';
import ReferenceStore from '../store/ReferenceStore';
import { relnotService } from '../service/relnotService';
@observer
export class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: '',
            releaseNoteText: ''
        };
    }

    componentDidMount() {
        // alert('list did mount')
        rn.getReleaseNotes();


        let rc = iMap(referenceStore)
        console.log("Values of observables in class 'referenceClass' ", rc.toJS());
    }

    componentDidUpdate() {
    }

    searchReleaseNoteKey = (event) => {
        var releaseNoteArray = [];
        var releaseNote = {};

        console.log('commentid: ' + this.state.commentID);

        //var releaseSelected = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "Release").filter(x => x.selected === true).map(a => a.id);
        let countryCodesSelected = ReferenceStore.countryCodesDefault.filter(x => x.selected === true).map(a => a.id);
        let environmentsSelected = ReferenceStore.environmentsDefault.filter(x => x.selected === true).map(a => a.id);
        let releaseID = parseInt(ReferenceStore.selectedReleaseID);
        let cleTypeID = parseInt(ReferenceStore.selectedCleTypeID);
        let key = event.target.value;


        environmentsSelected.forEach(idEnv => {
            countryCodesSelected.forEach(idCountry => {
                console.log(idEnv, idCountry);
                releaseNote["ReleaseId"] = parseInt(ReferenceStore.selectedReleaseID);
                releaseNote["CleTypeId"] = parseInt(ReferenceStore.selectedCleTypeID);
                releaseNote["CountryCodeId"] = idCountry;
                releaseNote["EnvironmentId"] = idEnv;
                //  releaseNote["CommentId"] = parseInt(this.state.commentID);
                releaseNote["Key"] = this.state.releaseNoteKey;
                releaseNote["Value"] = this.state.releaseNoteValue;
                releaseNoteArray.push(releaseNote);
                releaseNote = {}; // reinitialize the object
            });
        });

        let releaseNoteParms = {};
        releaseNoteParms["ReleaseId"] = releaseID;
        releaseNoteParms["CleTypeId"] = cleTypeID;
        releaseNoteParms["CountryCodeId"] = countryCodesSelected;
        releaseNoteParms["EnvironmentId"] = environmentsSelected;
        releaseNoteParms["Key"] = key;
        releaseNoteParms["Value"] = ""; // just for compliance

        console.log('$$$$$ releaseNoteSearchParms: ', releaseNoteParms);

        rn.searchReleaseNotes(releaseNoteParms);
        event.preventDefault();
    }

    render() {
        return (<div  >
            <div class="form-group">
            <label for="selRelease">Key</label>
                <input type="text" class="form-control" placeholder="search" onChange={this.searchReleaseNoteKey} ></input>
            </div>
            Telkens 1 file tonen. Met back en forward buttons elke file browsen.<br />
            Je bent telkens maar geinteresseerd in 1 key!!
            {releaseNoteStore.allReleaseNotes && releaseNoteStore.allReleaseNotes.length > 0 &&
                <table class="table" class="table table-striped table-bordered">
                    <tbody>
                        {releaseNoteStore.allReleaseNotes.map(r =>
                            <tr>
                                {/* <div selected="selected" key={r.id}> */}
                                <td>
                                    {r.value}
                                </td>
                                <td>
                                    {r.value}
                                </td>
                                <td>
                                    <button title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                        <span class="fa fa-pencil">Modify</span>
                                    </button>
                                </td>
                                <td>
                                    <button title="Supprimer" className="btnGrid btn-primary btn-warning content-remove-link"  >
                                        <span class="fa fa-trash">Delete</span>
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