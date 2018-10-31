import axios from 'axios';
import { config } from '../config'

// used in actions/referenceData
export const relnotService = {
  getReferenceData,
  AddComment,
  getComments,
  postReleaseNotes
}


function getReferenceData() {
  return axios.get(config.apiUrl + '/api/Config')
    .then(response => {
      return response.data;

    })
    .catch(function (error) {
      alert(error);
    })
}


// Comments
function AddComment(comment) {
  axios.post(config.apiUrl + '/api/Comment', {
    Name: comment
  })
    .then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      alert(error);
    });
}

function getComments() {
  return axios.get(config.apiUrl + '/api/Comment')
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      alert(error);
    });
}

/* Example
[
  {
  "id": 0,
  "countryCodeId": 0,
  "environmentId": 0,
  "cleTypeId": 0,
  "releaseId": 0,
  "commentId": 0,
  "value": null 
  },
  {
  "id": 0,
  "countryCodeId": 0,
  "environmentId": 0,
  "cleTypeId": 0,
  "releaseId": 0,
  "commentId": 0,
  "value": null 
  }
]
 */
var releaseNote2 =
{

  "countryCodeId": 11111,
  "environmentId": 0,
  "cleTypeId": 0,
  "releaseId": 0,
  "commentId": 0,
  "value": null
}


var ww = {
  "CountryCodeId": 1,
  "EnvironmentId": 0,
  "CleTypeId": 0,
  "ReleaseId": 0,
  "CommentId": 0,
  "Value": null
}


    //werkt : "countryCodeId":11111,"environmentId":22,"cleTypeId":0,"releaseId":1110,"commentId":0,"value":null 
    
function postReleaseNotes(releaseNoteArray) {
  axios.post(config.apiUrl + '/api/ReleaseNote', {releaseNoteArray:  releaseNoteArray})
    .then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      alert(error);
    });
}
