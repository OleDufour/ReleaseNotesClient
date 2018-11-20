import { observable, computed, action } from "mobx";
import { relnotService } from '../service/relnotService';

class ReleaseNoteStore {
    @observable releaseNotes = [];
    @computed get allReleaseNotes() { return this.releaseNotes }


    constructor(releaseNotes = []) {
        this.releaseNotes = releaseNotes;
    }

    @action.bound
    updateReleaseNote(releaseNoteId, releaseNote) {
        this.releaseNotes.map(p =>
        {
            if (p.releaseNoteId == releaseNoteId) {
                p.value = releaseNote.Value;
                p.keyName = releaseNote.KeyName;
                p.countryCodeId = releaseNote.CountryCodeId;
                p.environmentId = releaseNote.EnvironmentId;
                p.cleTypeId = releaseNote.CleTypeId;    
            }
        });
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
            //    alert(response);
            // alert(ReferenceStore.referenceData .length)
        })
    }

    deleteReleaseNoteKey(keyName) {
        relnotService.deleteReleaseNoteKey(keyName).then(response => {
            alert(response);
            // alert(ReferenceStore.referenceData .length)
        })
    }

}


const releaseNoteStore = new ReleaseNoteStore();
export default releaseNoteStore;