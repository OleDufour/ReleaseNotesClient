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
        releaseNoteStore.getReleaseNotes();


        let rc = iMap(referenceStore)
        console.log("Values of observables in class 'referenceClass' ", rc.toJS());
    }

    componentDidUpdate() {
    }

    searchReleaseNoteKey = (event) => {

        console.log('commentid: ' + this.state.commentID);

        let releaseID = parseInt(ReferenceStore.selectedReleaseIDGet);
        let key = event.target.value;

        let releaseNoteParms = {};
        releaseNoteParms["ReleaseId"] = releaseID;
        releaseNoteParms["KeyName"] = key;

        console.log('$$$$$ releaseNoteSearchParms: ', releaseNoteParms);
        releaseNoteStore.searchReleaseNotes(releaseNoteParms);
        event.preventDefault();
    }

    deleteReleaseNoteKey = (event) => {
        let keyName = event.target.attributes.getNamedItem('data-keyname').value;
        releaseNoteStore.deleteReleaseNoteKey(keyName);
    }


    render() {
        return (<div  >
            <div class="form-group">
                <label for="selRelease">Key</label>
                <input type="text" class="form-control" placeholder="search" onChange={this.searchReleaseNoteKey} ></input>
            </div>
            {releaseNoteStore.allReleaseNotes && releaseNoteStore.allReleaseNotes.length > 0 &&
                <table class="table" class="table table-striped table-bordered">
                    <tbody>
                        {releaseNoteStore.allReleaseNotes.map(r =>
                            <tr>
                                {/* <div selected="selected" key={r.id}> */}
                                <td>
                                    {r.keyName}
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
                                    <button data-keyname={r.keyName} onClick={this.deleteReleaseNoteKey} title="Supprimer" className="btnGrid btn-primary btn-warning content-remove-link"  >
                                        <span data-keyname={r.keyName} class="fa fa-trash">Delete  {r.keyName}</span>
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