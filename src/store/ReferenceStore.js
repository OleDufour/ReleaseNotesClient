import { observable, computed, action } from "mobx";
import { relnotService } from '../service/relnotService';

class ReferenceStore {
  @observable referenceData;
  // @computed get releases() { return this.referenceData.filter(x => x.propertyName === "Release"); }

  //   @computed get countryCodesDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CountryCode"); }
  //   @computed get countryCodes() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }

  // @computed get environmentsDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "Environment"); }
  // @computed get environments() { return this.referenceData.filter(x => x.propertyName === "Environment"); }

  @computed get cleTypes() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CleType"); }
  @computed get referenceDataDefault() { return this.referenceData.map((obj) => { obj.propertyName == "Release" || obj.propertyName == "CleType" ? obj.selected = false : obj.selected = true; return obj; }) }

  // updated when we select a Release :
  selectedReleaseID = 0;
  // updated when we select a CleType :
  selectedCleTypeID = 0;

    test=[];
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
    // alert ('action')
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