import { observable, computed } from "mobx";


class Store {
    @observable referenceData;

    @computed get releases() { return this.referenceData.filter(x => x.propertyName === "Release"); }
    @computed get countryCodes() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }
    @computed get environments() { return this.referenceData.filter(x => x.propertyName === "Environment"); }
    @computed get cleTypes() { return this.referenceData.filter(x => x.propertyName === "CleType"); }

    constructor(referenceData = []) {
        this.referenceData = referenceData;
    }
}


const store = new Store();

export default store;