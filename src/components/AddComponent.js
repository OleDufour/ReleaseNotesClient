import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import CommentStore from '../store/CommentStore';
import ReferenceStore from '../store/ReferenceStore';
import { relnotService } from '../service/relnotService';

@observer
export class AddComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: null,
            releaseNoteKey: '',
            releaseNoteValue: ''
        };
    }

    componentDidMount() {
        //  alert('add did mount')
        actions.getComments();
    }

    // we are selecting a comment.
    handleCommentChange = (event) => {
        console.log("commentid:", event.target.value);
        //alert(event.target.value);
        this.setState({ commentID: event.target.value });
    }
    // New release key
    handleReleaseNoteKeyChange = (event) => {
        this.setState({ releaseNoteKey: event.target.value });
    }

    //New release value
    handleReleaseNoteValueChange = (event) => {
        this.setState({ releaseNoteValue: event.target.value });
    }

    // Clicking on the submit button. Creates a new release note.
    // We are updating 
    handleReleaseNoteSave = (event) => {       
        
        var releaseNoteLight = {};
        console.log('commentid: ' + this.state.commentID);

        var countryCodesSelected = ReferenceStore.countryCodesDefault.filter(x => x.selected === true).map(a => a.id);
        var environmentsSelected = ReferenceStore.environmentsDefault.filter(x => x.selected === true).map(a => a.id);
        let releaseID = parseInt(ReferenceStore.selectedReleaseIDGet);
        let cleTypeID = parseInt(ReferenceStore.selectedCleTypeID);

        releaseNoteLight["ReleaseId"] = releaseID;
        releaseNoteLight.CleTypeId = cleTypeID;
        releaseNoteLight["CountryCodeId"] = countryCodesSelected;
        releaseNoteLight["EnvironmentId"] = environmentsSelected;
        releaseNoteLight["KeyName"] = this.state.releaseNoteKey;
        releaseNoteLight["Value"] = this.state.releaseNoteValue;
        releaseNoteLight. CommentId =  this.state.commentID;

        relnotService.postReleaseNotes(releaseNoteLight);
        event.preventDefault();
    }

    render() {
        return (<div className="container mt-3">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Select a comment (if you wish)</label>
                    {CommentStore.comments && CommentStore.comments.length > 0 &&
                        <div className="dropdown show">
                            <select className="form-control js-DisplayOn valid" onChange={this.handleCommentChange} >
                                {CommentStore.comments.map(com =>
                                    <option key={com.id} value={com.id}>{com.name}</option>
                                )};
                              </select>
                        </div>
                    }
                    <small id="emailHelp" class="form-text text-muted">A comment groups a set of release notes and is preceded by a # sign in the output file.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Key</label>
                    <input type="text" class="form-control" value={this.state.releaseNoteKey} onChange={this.handleReleaseNoteKeyChange} />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Value</label>
                    <input type="text" class="form-control" value={this.state.releaseNoteValue} onChange={this.handleReleaseNoteValueChange} class="form-control" />
                    <small id="emailHelp" class="form-text text-muted">The value will be updated for keys that already exist.</small>
                </div>
                <button onClick={this.handleReleaseNoteSave} class="btn btn-primary" type="button">Save</button>
            </form>
        </div >);
    }
}
export default AddComponent;