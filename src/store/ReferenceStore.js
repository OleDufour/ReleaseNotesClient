import { observable, computed } from "mobx";


class ReferenceStore {
    @observable referenceData;
   // @computed get releases() { return this.referenceData.filter(x => x.propertyName === "Release"); }
 
 //   @computed get countryCodesDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CountryCode"); }
 //   @computed get countryCodes() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }

    // @computed get environmentsDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "Environment"); }
    // @computed get environments() { return this.referenceData.filter(x => x.propertyName === "Environment"); }

    @computed get cleTypes() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CleType"); }
    @computed get referenceDataDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }) }

    constructor(referenceData = []) {
        this.referenceData = referenceData;
    }
}




const referenceStore = new ReferenceStore();

export default referenceStore;