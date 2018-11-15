import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import { relnotService } from '../service/relnotService';
import referenceStore from '../store/ReferenceStore';
import commentStore from '../store/CommentStore';

@observer
class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            commentsCount: 0,
            comments: []
        };
    }
    fetchNew = false;

    componentDidMount() {
        console.log("$$$$$$$$$$", commentStore.commentsCount)
        referenceStore.showNonReleaseInfo = false;
        alert('page refresh')
         actions.getComments();
        alert('componentDidMount')
    }

 

    componentWillUpdate() {

        //  console.log("********", commentStore.commentsCount)
        //this.setState({ comments: commentStore.commentData.length })
        //console.log("$$$$$$$$$$", this.state.commentsCount)
        //  commentStore.commentData = [];
        if (this.fetchNew);
        actions.getComments();
       this. fetchNew = false;
    }

    // Voorbeeld: https://reactjs.org/docs/forms.html

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleClick = (event) => {
        relnotService.AddComment(this.state.value);
        this.fetchNew = true;
        event.preventDefault();
    };


    render() {
        return (
            <React.Fragment>
                <div class="col-md-7">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
                        </div>
                        <input type="text" value={this.state.value} onChange={this.handleChange} class="form-control" />
                        <div class="input-group-append">
                            <button type="button" onClick={this.handleClick} class="btn btn-primary" >Save comment</button>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <table class="table" class="table table-striped table-bordered ">
                        <thead>
                            <tr>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentStore.getCommentData.map(x =>
                                <tr>
                                    <td>
                                        {x.modification && <input onChange={this.modifyReleaseNoteValue} defaultValue={x.name} class="form-control" />}
                                        {!x.modification && x.name}
                                    </td>
                                    <td>
                                        {!x.modification &&
                                            <React.Fragment>
                                                <button onClick={this.startModifyingReleaseNoteKey}
                                                    data-releasenoteid={x.releaseNoteId}
                                                    title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                    <span
                                                        data-name={x.name}
                                                        class="fa fa-pencil">
                                                        <span
                                                            data-name={x.name} class='test'>&nbsp;&nbsp;Modify  </span></span>
                                                </button>  &nbsp;&nbsp;
                                             </React.Fragment>
                                        }
                                        {x.modification &&
                                            <React.Fragment>
                                                <button onClick={this.saveReleaseNote}
                                                    data-cletypeid={x.cleTypeId}
                                                    data-countrycodeid={x.countryCodeId}
                                                    data-releasenoteid={x.releaseNoteId}
                                                    data-keyname={x.keyName}
                                                    title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                    <span
                                                        data-cletypeid={x.cleTypeId}
                                                        data-countrycodeid={x.countryCodeId}
                                                        data-environmentid={x.environmentId}
                                                        data-releasenoteid={x.releaseNoteId}
                                                        class="fa fa-save"><span data-releasenoteid={x.releaseNoteId} data-keyname={x.keyName} class='test'>&nbsp;&nbsp;Save  </span></span>
                                                </button> &nbsp;&nbsp;
                                    </React.Fragment>
                                        }

                                        <button data-keyname={x.keyName} onClick={this.deleteReleaseNoteKey} title="Supprimer" className="btnGrid btn-primary btn-warning  "  >
                                            <span data-keyname={x.keyName} class="fa fa-trash"><span data-keyname={x.keyName} class='test'>&nbsp;&nbsp;Delete </span> </span>
                                        </button>
                                    </td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </React.Fragment>
        );
    }
}
export default CommentComponent;