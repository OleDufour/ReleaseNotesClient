import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import CommentStore from '../store/CommentStore';
import ReferenceStore from '../store/ReferenceStore';

@observer
export class AddComponent extends Component {
    constructor(props) {
        super(props)
        
       

        this.state = {
            value: ''
        };
    }

    componentDidMount() {

        actions.getComments();
    }

    handleReleaseNoteChange = (event) => {

        this.setState({ value: event.target.value });
    }

    handleReleaseNoteSave = (event) => {

       

        actions.   postReleaseNote('','');
        event.preventDefault();
    }

    render() {
        return (<div class="container mt-3">
            {CommentStore.comments && CommentStore.comments.length > 0 &&
                <div class="input-group mb-3">
                    <div class="dropdown show">
                        <select className="form-control js-DisplayOn valid">
                            {CommentStore.comments.map(com =>
                                <option key={com.id} value={com.id}>{com.name}</option>
                            )};
                     </select>
                    </div>
                </div>
            }

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
                </div>
                <input type="text" value={this.state.value} onChange={this.handleReleaseNoteChange} class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                <div class="input-group-append">
                    <button onClick={this.handleReleaseNoteSave} class="btn btn-primary" type="button">Save</button>
                </div>
            </div>
        </div >);
    }
}
export default AddComponent;