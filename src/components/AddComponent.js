import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import CommentStore from '../store/CommentStore';
import ReferenceStore from '../store/ReferenceStore';
import { relnotService } from '../service/relnotService';
import referenceStore from '../store/ReferenceStore';

@observer
export class AddComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentID: null,
            releaseNoteKey: '',
            releaseNoteValue: '',
            validationError: false,
            validationMessageText: null

        };
    }

    componentDidMount() {
        //  alert('add did mount')
        actions.getComments();
        referenceStore.showNonReleaseInfo = true;
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

        var countryCodesSelected = ReferenceStore.countryCodesDefault.filter(x => x.selected === true).map(a => a.id);
        var environmentsSelected = ReferenceStore.environmentsDefault.filter(x => x.selected === true).map(a => a.id);
        let releaseID = parseInt(ReferenceStore.selectedReleaseIDGet);
        let cleTypeID = parseInt(ReferenceStore.selectedCleTypeIDGet);

        if (cleTypeID == 0) { this.setState({ validationMessageText: 'Please select a release type' }); return; }
        if (!countryCodesSelected || countryCodesSelected.length === 0) { this.setState({ validationMessageText: 'Please select one or more countries' }); return; }
        if (!environmentsSelected || environmentsSelected.length === 0) { this.setState({ validationMessageText: 'Please select one or more environments' }); return; }
        if (this.state.releaseNoteKey.trim() === '') { this.setState({ validationMessageText: 'Please specify a value for the key' }); return; }
        if (this.state.releaseNoteValue.trim() === '') { this.setState({ validationMessageText: 'Please specify a value' }); return; }
        this.setState({ validationMessageText: null });

        var releaseNoteParms = {};
        console.log('commentid: ' + this.state.commentID);

        releaseNoteParms.ReleaseNoteId = 0;
        releaseNoteParms["ReleaseId"] = releaseID;
        releaseNoteParms.CleTypeId = cleTypeID;
        releaseNoteParms["CountryCodeId"] = countryCodesSelected;
        releaseNoteParms["EnvironmentId"] = environmentsSelected;
        releaseNoteParms["KeyName"] = this.state.releaseNoteKey;
        releaseNoteParms["Value"] = this.state.releaseNoteValue;
        releaseNoteParms.CommentId = this.state.commentID;

        relnotService.postReleaseNotes(releaseNoteParms);
        event.preventDefault();
    }

    render() {
        return (<div className="container mt-3">
            {this.state.validationMessageText &&
                <div class="alert alert-danger"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    &nbsp;&nbsp;{this.state.validationMessageText}
                </div>
            }
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



                <div class="container">
                    <div class="row">
                        <button onClick={this.handleReleaseNoteSave} class="btn btn-primary" type="button">&nbsp;&nbsp;Save &nbsp;&nbsp;</button>
                    </div>
                </div>
            </form>
        </div >);
    }
}
export default AddComponent;