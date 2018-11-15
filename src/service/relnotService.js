import axios from 'axios';
import { config } from '../config'

// used in actions/referenceData
export const relnotService = {
  getReferenceData,
  AddComment,
  getComments,
  postReleaseNotes,
  updateReleaseNote,
  getReleaseNotes,
  searchReleaseNotes,
  deleteReleaseNoteKey
}


function getReferenceData() {
  return axios.get(config.apiUrl + '/api/Config')
    .then(response => {
//console.log(response);
      return response.data.map((x) => { x.selected = false; return x; });
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
   
    })
    .catch(function (error) {
      alert(error);
    });
}

function getComments() {
  return axios.get(config.apiUrl + '/api/Comment')
    .then(response => {
      return response.data.map((x) => { x.modification = false; return x; }); 
    })
    .catch(function (error) {
      alert(error);
    });
}

function postReleaseNotes(releaseNote) {
  axios.post(config.apiUrl + '/api/ReleaseNote', releaseNote)
    .then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      alert(error);
    });
}

function updateReleaseNote(releaseNote) {
  axios.put(config.apiUrl + '/api/ReleaseNote', releaseNote)
    .then(function (response) {
      console.log("releasenote :", response);

    })
    .catch(function (error) {
      console.log('err:', error);
    });
}


function getReleaseNotes() {
  return axios.get(config.apiUrl + '/api/ReleaseNote')
    .then(response => {
      return response;
    })
    .catch(function (error) {
      alert(error);
    });
}

function searchReleaseNotes(releaseNoteParms) {
  return axios.post(config.apiUrl + '/api/ReleaseNote/SearchReleaseNotes', releaseNoteParms)
    .then(function (response) {
      return response.data.map((x) => { x.modification = false; return x; });;
    })
    .catch(function (error) {
      alert(error);
    });
}

function deleteReleaseNoteKey(releaseNoteKey) {
  alert('relnots')
  return axios.delete(config.apiUrl + '/api/ReleaseNote/' + releaseNoteKey)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      alert(error);
    });
}

