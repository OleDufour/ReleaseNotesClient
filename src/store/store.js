import { observable, computed } from "mobx";


// must be declared in class:

class Store {
    @observable referenceData;
    @computed get countryCodes () {
        return this.referenceData.filter(x => x.propertyName === "CountryCode");
    }
    constructor(referenceData = []) {
        this.referenceData = referenceData;

    }

}


const store = new Store();

export default store;