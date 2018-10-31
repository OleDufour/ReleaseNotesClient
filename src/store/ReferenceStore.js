import { observable, computed } from "mobx";


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
    selectedReleaseID=0;

    // updated when we select a CleType :
    selectedCleTypeID=0;

    constructor(referenceData = []) {
        this.referenceData = referenceData;
    }
}




const referenceStore = new ReferenceStore();

export default referenceStore;