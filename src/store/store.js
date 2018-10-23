import { observable, computed, action } from "mobx";


class Store {
    @observable referenceData;

    @computed get releases() { return this.referenceData.filter(x => x.propertyName === "Release"); }
    @computed get countryCodesDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CountryCode"); }
    @computed get countryCodes() { return this.referenceData.filter(x => x.propertyName === "CountryCode"); }
    // set selected(value) {
    //     // selected = true for what : id or code
    //     this.referenceData[3].selected = value;
    //     this.referenceData[4].selected = value;
    //     this.referenceData[5].selected = value;
  
    // }

    @computed get environmentsDefault() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "Environment"); }
    @computed get environments() { return this.referenceData.filter(x => x.propertyName === "Environment"); }
    @computed get cleTypes() { return this.referenceData.map((obj) => { obj.selected = true; return obj; }).filter(x => x.propertyName === "CleType"); }

    constructor(referenceData = []) {
        this.referenceData = referenceData;
    }


    // setSelected(arr, propertyName, id, value) {
    //     return cars.map(car => {
    //         if (car.brand == "BMW") {
    //             return {
    //                 ...car,
    //                 model: car.model.map(model => {
    //                     if (model.name == "730d") {
    //                         return {
    //                             ...model,
    //                             price: 7780
    //                         }
    //                     }
    //                     else
    //                         return model;
    //                 }),
    //             };
    //         } else {
    //             return car;
    //         }
    //     });

    // }



}




const store = new Store();

export default store;