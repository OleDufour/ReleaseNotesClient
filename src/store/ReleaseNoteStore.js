import { observable, computed, action } from "mobx";
import { relnotService } from '../service/relnotService';

class ReleaseNoteStore   {
    @observable releaseNotes=[];
    @computed get allReleaseNotes() { return this.releaseNotes  }


    constructor(releaseNotes = []) {
        this.releaseNotes = releaseNotes;
    }


    getReleaseNotes() {
        relnotService.getReleaseNotes().then(response => {
            this.releaseNotes = response;
            // alert(ReferenceStore.referenceData .length)
        })
    }
    searchReleaseNotes(releaseNoteParms) {        
        relnotService.searchReleaseNotes(releaseNoteParms).then(response => {
        
            this.releaseNotes = response;
            alert(response);
            // alert(ReferenceStore.referenceData .length)
        })
    }
}


const releaseNoteStore = new ReleaseNoteStore();
export default releaseNoteStore;