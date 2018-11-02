import { observable, computed, action } from "mobx";
import { relnotService } from '../service/relnotService';

class ReleaseNote   {
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
}


const releaseNotes = new ReleaseNote();
export default releaseNotes;