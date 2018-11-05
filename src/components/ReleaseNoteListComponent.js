import React, { Component } from 'react';
import { observer } from "mobx-react"
import { Map as iMap } from "immutable";
import { actions } from '../actions/referenceData';
import rn from '../store/ReleaseNoteStore';
import referenceStore from '../store/ReferenceStore';
import ReleaseNote from '../store/ReleaseNoteStore';

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
        rn.getReleaseNotes();
        alert ('list mount')
           referenceStore.    referenceData.map((x)=>{x.selected=false; return x;});
     
        let rc = iMap(referenceStore)
console.log("Values of observables in class 'referenceClass' ",rc.toJS());
    }



    render() {
        // var commentStoreDefault = CommentStore.comments.unshift({ id: 0, name: '' });

        return (<div className="container mt-3">
            {ReleaseNote.allReleaseNotes && ReleaseNote.allReleaseNotes.length > 0 &&
                <div>
                    {ReleaseNote.allReleaseNotes.map(r =>
                        <div selected="selected" key={r.id}>
                            {r.value}
                            <div><button title="Modifier" className="btnGrid btn-primary content-modify-link" data-toggle="modal" data-target="#myModal" data-itemid="188446"  >
                                <span class="fa fa-pencil"></span>
                            </button></div>
                            <div>
                                <button title="Supprimer" className="btnGrid btn-primary btn-warning content-remove-link"  >
                                    <span class="fa fa-trash"></span>
                                </button>
                            </div>
                        </div>


                    )}
                </div>
            }
        </div >);
    }
}
export default ListComponent;