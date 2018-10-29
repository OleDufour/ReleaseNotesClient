


import { relnotService } from '../service/relnotService';
import ReferenceStore from '../store/ReferenceStore';
import CommentStore from '../store/CommentStore';
 
export const actions = {
    getAllReferenceData,
    getComments,
    postReleaseNote
}


function getAllReferenceData() {
    relnotService.getReferenceData().then(response => {
        ReferenceStore.referenceData = response;
         // alert(ReferenceStore.referenceData .length)
    })
}


function getComments() {
    relnotService.getComments().then(response => {
        CommentStore.commentData = response;
        //  alert( store.referenceData)
    })
}

function postReleaseNote(commentID, releaseNote) {
    var countryCodesDefault = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode");
    console.log(countryCodesDefault.filter(x => x.selected === true).length);


 


}