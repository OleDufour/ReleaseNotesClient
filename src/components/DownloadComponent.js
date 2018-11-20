import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';

import ReferenceStore from '../store/ReferenceStore';
import { relnotService } from '../service/relnotService';
import referenceStore from '../store/ReferenceStore';

@observer
export class DownloadComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: '',
            releaseNoteText: ''
        };
    }

    componentDidMount() {
        referenceStore.showNonReleaseInfo = false;
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
    download = (event) => {
        let releaseID = parseInt(referenceStore.selectedReleaseIDGet);
        alert(releaseID);

 
        event.preventDefault();
    }

    render() {
        // var commentStoreDefault = CommentStore.comments.unshift({ id: 0, name: '' });

        return (<div class="input-group mb-5">
            <div class="form-group">
                <label for="exampleInputEmail1">Download release note files</label>
                <div class="input-group mb-3">
                
                        <button type="button" onClick={this.download} class="btn btn-primary" >Ok</button>
                   
                </div>
            </div>
        </div>);
    }
}
export default DownloadComponent;