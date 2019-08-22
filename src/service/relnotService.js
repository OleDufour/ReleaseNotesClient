import axios from 'axios';
import { config } from '../config'
import PropTypes from 'prop-types';

// used in actions/referenceData
export const relnotService = {
  getReferenceData,

  addComment,
  getComments,
  deleteComment,
  updateComment,

  postReleaseNotes,
  updateReleaseNote,
  getReleaseNotes,
  searchReleaseNotes,
  deleteReleaseNoteKey,

}


const propTypeTest = {
  username: PropTypes.number.isRequired
}


function getReferenceData() {
  return axios.get(config.apiUrl + '/api/Config')
    .then(response => {
      //console.log(response);
      return response.data.map((x) => { x.selected = true; return x; });
    })
    .catch(function (error) {
      alert(error);
    })
}
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  if (typeof year != 'number')
    alert(year + 'is not a numberr');
 
  this.year = year;
};




// Comments
async function addComment(comment) {
  if (typeof comment != 'number')
    alert('pas un entier !');

    var auto = new Car('Honda', 'Accord', '1998');

alert (auto instanceof Car);

  await axios.post(config.apiUrl + '/api/Comment', comment)
    .then(response => {
      comment.id = response.data.id;
      return comment;
    })
    .catch(function (error) {
      alert(error);
    });
}
function getComments() {
  return axios.get(config.apiUrl + '/api/Comment')
    .then(response => {
      return response.data.map((x) => { x.selected = false; x.modification = false; return x; });
    })
    .catch(function (error) {
      alert(error);
    });
}
async function deleteComment(id) {
  await axios.delete(config.apiUrl + '/api/Comment/' + id)
    .then(function (response) {
      // alert(id + ' deleted')
      // return id;
    })
    .catch(function (error) {
      alert(error);
    });
}
async function updateComment(comment) {
  await axios.put(config.apiUrl + '/api/Comment/', comment)
    .then(function (response) {

      return comment.id;
    })
    .catch(function (error) {
      alert(error);
    });
}


//------------------------------------------------------------
function postReleaseNotes(releaseNote) {
  axios.post(config.apiUrl + '/api/ReleaseNote', releaseNote)
    .then(function (response) {
      alert(response);
    })
    .catch(function (error) {
      alert(error);
    });
}

async function updateReleaseNote(releaseNote) {
  await axios.put(config.apiUrl + '/api/ReleaseNote', releaseNote)
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

