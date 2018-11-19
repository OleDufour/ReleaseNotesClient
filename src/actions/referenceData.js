
import { relnotService } from '../service/relnotService';
import ReferenceStore from '../store/ReferenceStore';
import CommentStore from '../store/CommentStore';
import { autorun } from 'mobx';

export const actions = {
   
    getComments,
    postReleaseNotes
}


// function getAllReferenceData() {
//     relnotService.getReferenceData().then(response => {
//         ReferenceStore.referenceData = response;
//         // alert(ReferenceStore.referenceData .length)
//     })
// }


function getComments() {
    relnotService.getComments().then(response => {
        CommentStore.commentData = response;
        //  alert( store.referenceData)
    })
}

function postReleaseNotes(commentID, releaseNoteText) {

   // alert(commentID + ' - ' + releaseNoteText);
    // todo create json here

  //  var countryCodesDefault = ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "CountryCode");
   // console.log(countryCodesDefault.filter(x => x.selected === true).length);
  //  var test = JSON.stringify(countryCodesDefault);
//    console.log('**********stringification:', ReferenceStore.referenceDataDefault)

    // autorun(() => {
    //     console.log('qsdfdsqfqdsf', JSON.stringify(ReferenceStore.referenceData)); //value is an observable.
    //   });

}