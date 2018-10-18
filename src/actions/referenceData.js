
import { relnotService } from '../service/relnot';
import store from '../store/store';


export  const  actions = {
    getAllReferenceData
}

  // what's the use ?
function getAllReferenceData() {
    relnotService.getReferenceData().then(response => {
       store.referenceData= response;
     //  alert( store.referenceData)
    })

}
