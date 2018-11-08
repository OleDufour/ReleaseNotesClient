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
        // alert('list did mount')
        rn.getReleaseNotes();

        referenceStore.referenceData.map((x) => { x.selected = false; return x; });

        let rc = iMap(referenceStore)
        console.log("Values of observables in class 'referenceClass' ", rc.toJS());
    }

    componentDidUpdate() {
        alert('did update')
        referenceStore.referenceData.map((x) => { x.selected = false; return x; });
    }
    render() {
        return (<div className="container mt-3">
        <input placeholder="search" ></input>
            Telkens 1 file tonen. Met back en forward buttons elke file browsen.<br/>
Je bent telkens maar geinteresseerd in 1 key!!
            {ReleaseNote.allReleaseNotes && ReleaseNote.allReleaseNotes.length > 0 &&
                <table class="table" class="table table-striped table-bordered">
                    <tbody>
                        {ReleaseNote.allReleaseNotes.map(r =>
                            <tr>
                                {/* <div selected="selected" key={r.id}> */}
                                <td>
                                    {r.value}
                                </td>
                                <td>
                                    <button title="Modifier" className="btnGrid btn-primary content-modify-link" >
                                        <span class="fa fa-pencil">Modify</span>
                                    </button>
                                </td>
                                <td>
                                    <button title="Supprimer" className="btnGrid btn-primary btn-warning content-remove-link"  >
                                        <span class="fa fa-trash">Delete</span>
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