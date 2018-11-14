import React, { Component } from 'react';

import { relnotService } from '../service/relnotService';
import referenceStore from '../store/ReferenceStore';

class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {

        referenceStore.showNonReleaseInfo = false;

    }

    // Voorbeeld: https://reactjs.org/docs/forms.html

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleClick = (event) => {
        relnotService.AddComment(this.state.value);
        //    alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    };


    render() {
        return (
            <div class="input-group mb-3">


                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
                </div>
                <input type="text" value={this.state.value} onChange={this.handleChange} class="form-control" />
                <div class="input-group-append">
                    <button type="button" onClick={this.handleClick} class="btn btn-primary" >Save comment</button>
                </div>

                <table class="table" class="table table-striped table-bordered">
                    <tbody>
                    </tbody>
                </table>

            </div>


        );
    }
}
export default CommentComponent;