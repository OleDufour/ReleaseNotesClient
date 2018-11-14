import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import CommentStore from '../store/CommentStore';
import ReferenceStore from '../store/ReferenceStore';
import { relnotService } from '../service/relnotService';

@observer
export class ErrorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: '',
            releaseNoteText: ''
        }; 
    }

    componentDidMount() {
      //  alert('add did mount')
        actions.getComments();
    }

    // we are selecting a comment.
    handleCommentChange = (event) => {
        // console.log(event.target.value);
        this.setState({ commentID: event.target.value });
    }
    // we are typing a new release note
    handleReleaseNoteChange = (event) => {
        this.setState({ releaseNoteText: event.target.value });
    }



    // Clicking on the submit button. Creates a new release note.
    // We are updating 
    handleReleaseNoteSave = (event) => {
        alert(ReferenceStore.selectedReleaseID);

        var releaseNoteArray = [];
        var releaseNote = {};

        console.log('commentid: ' + this.state.commentID);

       // var test = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "Release").filter(x => x.selected === true).map(a => a.id);
        console.log('release', test[0]);

        var releaseSelected = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "Release").filter(x => x.selected === true).map(a => a.id);
        var countryCodesSelected = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode").filter(x => x.selected === true).map(a => a.id);
        var environmentsSelected = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "Environment").filter(x => x.selected === true).map(a => a.id);

        environmentsSelected.forEach(idEnv => {
            countryCodesSelected.forEach(idCountry => {
                console.log(idEnv, idCountry);
                releaseNote["ReleaseId"] = parseInt(ReferenceStore.selectedReleaseID);
                releaseNote["CleTypeId"] = parseInt(ReferenceStore.selectedCleTypeID);
                releaseNote["CountryCodeId"] = idCountry;
                releaseNote["EnvironmentId"] = idEnv;
                releaseNote["CommentId"] =  parseInt(this.state.commentID);
                releaseNote["Value"] = this.state.releaseNoteText;
                releaseNoteArray.push(releaseNote);
                releaseNote = {}; // reinitialize the object
            });
        });

        console.log('releaseNoteArray: ', releaseNoteArray);

        relnotService.postReleaseNotes(releaseNoteArray);
        event.preventDefault();
    }

    render() {
        // var commentStoreDefault = CommentStore.comments.unshift({ id: 0, name: '' });

        return (   <div class="input-group mb-5">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Delete</span>
        </div>
        <input type="text" value={this.state.releaseNoteText} onChange={this.handleReleaseNoteChange} class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        <div class="input-group-append">
            <button onClick={this.handleReleaseNoteSave} class="btn btn-primary" type="button">Save</button>
        </div>
    </div>);
    }
}
export default ErrorComponent;