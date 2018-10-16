import { observable } from "mobx";


// must be declared in class:

class Store {
    @observable  referenceData;

    constructor(referenceData=[]) {
        this.referenceData =referenceData;
    
      }

}


const store = new Store();

export default store;