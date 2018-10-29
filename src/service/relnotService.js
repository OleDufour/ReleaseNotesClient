import axios from 'axios';
import { config } from '../config'

export const relnotService = {
  getReferenceData,
  AddComment,
  getComments,
  postReleaseNote
}

var url = config.apiUrl;


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

function postReleaseNote(){




}
 