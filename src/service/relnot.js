import axios from 'axios';
import { config } from '../config'



export const relnotService = {
  getReferenceData, 
  AddComment
}

var url = config.apiUrl;


function getReferenceData() {
  return axios.get(config.apiUrl + '/api/Config')
    .then(response => {
      return response.data;

    })
    .catch(function (error) {
      // handle error
      alert(error);
    })
}


// Comments
function AddComment  (comment) {

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