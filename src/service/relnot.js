import axios from 'axios';
import {config} from '../config'



export const relnotService={
getReferenceData

}

var url  = config.apiUrl;


function getReferenceData () {
 
  return  axios.get(config.apiUrl + '/users/GetAllDDL')
    .then(response => {
    return response.data;
       
    })
    .catch(function (error) {
        // handle error
       // alert(error);
      })

}