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
  return axios.get(config.apiUrl + '/api/Comment' )
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
var test =
{
  "id": 0,
  "countryCodeId": 0,
  "environmentId": 0,
  "cleTypeId": 0,
  "releaseId": 0,
  "commentId": 0,
  "value": null 
  }

function postReleaseNotes(){
  axios.post(config.apiUrl + '/api/ReleaseNote', {
    ReleaseNote: test
  })
    .then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      alert(error);
    });
}
 