import React, { Component } from 'react';
import { observer } from "mobx-react"

import { actions } from '../actions/referenceData';
import { relnotService } from '../service/relnotService';
import referenceStore from '../store/ReferenceStore';
import commentStore from '../store/CommentStore';
import commentActions from '../actions/CommentActions';

@observer
class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',        // for a new value
            currentValue: '',  // update in grid
            commentsCount: commentStore.allComments.length,
            comments: [],
            currentCommentId: 0,
            currentCommentName: '',
            fetchNew: false
        };
    }
    _fetchNew = false;

    componentDidMount() {
        console.log("$$$$$$$$$$", commentStore.commentsCount)
        referenceStore.showNonReleaseInfo = false;
        actions.getComments();
    }

    startModifying = (event) => {
        this.setState({ currentCommentId: parseInt(event.target.attributes.getNamedItem('data-id').value) });
        // this.setState({ currentCommentName: event.target.attributes.getNamedItem('data-name').value });

        let id = parseInt(event.target.attributes.getNamedItem('data-id').value);
        commentStore.allComments.map(x => { x.modification = x.id == id ? true : false; });
    }

    delete = (event) => {

     

        this.setState({ currentCommentId: parseInt(event.target.attributes.getNamedItem('data-id').value) });
        this.setState({ currentCommentName: event.target.attributes.getNamedItem('data-name').value });
        this.setState({ fetchNew: true });

        let id = parseInt(event.target.attributes.getNamedItem('data-id').value);

        relnotService.deleteComment(id).then(result => {
            //  alert('return!')
            commentStore.commentData = commentStore.commentData.filter(obj => obj.id !== id);
        }).catch(err => {
        });
    }

    setNewValue = (event) => {
        this.setState({ value: event.target.value });
    }

    add = (event) => {
        var comment = { id: 0, name: this.state.value };
        relnotService.addComment(comment).then(result => {

            console.log("µµµµµµµµµµµµ", comment)
            // var newComment = { id: result.data.id, name: result.data.name };
            commentStore.commentData.unshift(comment)
        });

        // this.setState({ commentsCount: commentStore.allComments.length + 1 });
        event.preventDefault();
    };

    setExistingValue = (event) => {
        this.setState({ currentValue: event.target.value });
    }

    update = (event) => {
        let id = parseInt(this.state.currentCommentId);
        let name = this.state.currentValue;
        alert(id + ' ' + name);
        let comment = { id: id, name: name };
        relnotService.updateComment(comment).then(result => {

            commentStore.updateComment(id, name)

            commentStore.allComments.map(x => { x.modification = false; });
        });
    }


    render() {
        return (
            <React.Fragment>
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Add a new comment</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Add</span>
                            </div>
                            <input type="text" value={this.state.value} onChange={this.setNewValue} class="form-control" />
                            <div class="input-group-append">
                                <button type="button" onClick={this.add} class="btn btn-primary" >Save comment</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <table class="table" class="table table-striped table-bordered ">
                        <thead>
                            <tr><th>Comments</th><th></th></tr>
                        </thead>
                        <tbody>
                            {commentStore.getCommentData && commentStore.getCommentData.map(x =>
                                <tr>
                                    <td>
                                        {x.modification && <input onChange={this.setExistingValue} defaultValue={x.name} class="form-control" />}
                                        {!x.modification && x.name}
                                    </td>
                                    <td>
                                        {!x.modification &&
                                            <React.Fragment>
                                                <button onClick={this.startModifying}
                                                    data-id={x.id}
                                                    data-name={x.name}
                                                    title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                    <span
                                                        data-id={x.id}
                                                        data-name={x.name}
                                                        class="fa fa-pencil">
                                                        <span
                                                            data-id={x.id}
                                                            data-name={x.name}
                                                            class='test'>&nbsp;&nbsp;Modify  </span></span>
                                                </button>  &nbsp;&nbsp;
                                             </React.Fragment>
                                        }
                                        {x.modification &&
                                            <React.Fragment>
                                                <button onClick={this.update}
                                                    data-id={x.id}
                                                    data-name={x.name}
                                                    title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                                    <span
                                                        data-id={x.id}
                                                        data-name={x.name}
                                                        class="fa fa-save">
                                                        <span
                                                            data-id={x.id}
                                                            data-name={x.name} class='test'>&nbsp;&nbsp;Save  </span></span>
                                                </button> &nbsp;&nbsp;
                                    </React.Fragment>
                                        }

                                        <button data-id={x.id} data-name={x.name} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(e) }} title="Supprimer" className="btnGrid btn-primary btn-warning  "  >
                                            <span data-id={x.id} data-name={x.name} data-keyname={x.keyName} class="fa fa-trash"><span data-id={x.id} data-name={x.name} class='test'>&nbsp;&nbsp;Delete </span> </span>
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