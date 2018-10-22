import { observable, computed , action} from "mobx";


class Store {
    @observable referenceData;

    @computed get releases() { return this.referenceData.filter(x => x.propertyName === "Release"); }
    @computed get countryCodes() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CountryCode"); }
    set selected(value) {
        // selected = true for what : id or code
        this.referenceData[3].selected = value;
        this.referenceData[4].selected = value;
        this.referenceData[5].selected = value;
    }
    @computed get environments() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "Environment"); }
    @computed get cleTypes() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CleType"); }

    constructor(referenceData = []) {
        this.referenceData = referenceData;

    }




}




const store = new Store();

export default store;