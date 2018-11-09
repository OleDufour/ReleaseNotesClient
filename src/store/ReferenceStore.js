import { observable, computed, action } from "mobx";
import { relnotService } from '../service/relnotService';

class ReferenceStore {
  @observable referenceData = [];
  @computed get releases() {
    var releases = this.referenceData.filter(x => x.propertyName === "Release");
    return releases.reverse(); // we need the latest to appear at the top.
  }

  @computed get cleTypes() {
    var defaultValue = { id: 0, name: '' };
    var cleType = this.referenceData.filter(x => x.propertyName === "CleType");
    cleType.unshift(defaultValue)
    return cleType;
  }

  @computed get countryCodesDefault() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }
  //   @computed get countryCodes() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }

  @computed get environmentsDefault() { return this.referenceData.filter(x => x.propertyName === "Environment"); }
  // @computed get environments() { return this.referenceData.filter(x => x.propertyName === "Environment"); }


  @computed get referenceDataDefault() { return this.referenceData.map((obj) => { obj.propertyName == "Release" || obj.propertyName == "CleType" ? obj.selected = false : obj.selected = true; return obj; }) }

  // updated when we select a Release :
  @observable selectedReleaseID = 0;
  @computed get selectedReleaseIDGet() {
    return this.selectedReleaseID == 0 ? this.releases[0].id : this.selectedReleaseID;
  };

  // updated when we select a CleType :
  selectedCleTypeID = 0;


  constructor(refData = []) {
    this.referenceData = refData;
  }


  getAllReferenceData() {
    relnotService.getReferenceData().then(response => {
      this.referenceData = response;
      // alert(ReferenceStore.referenceData .length)
    })
  }

  // see  https://egghead.io/lessons/react-use-mobx-actions-to-change-and-guard-state
  @action selectUnselectReferenceData(propertyName, refID, value) {

    this.referenceData.map(ref => {
      if (ref.propertyName == propertyName && ref.id == refID) {
        // alert(value);
        ref.selected = value;
      }
    })
  }



}




const referenceStore = new ReferenceStore();

export default referenceStore;