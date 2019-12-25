import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import ReferenceStore from '../../store/ReferenceStore';
import { relnotService } from '../../service/relnotService';

function matui() {
  const [state, setState] = React.useState({});

  useEffect(() => {
 
    const cols = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'Rotterdam', 63: 'amsterdam' },
        },
      ]
    };

    const dat = { data: [] };
    relnotService.getReferenceData().then(response => {
      dat.data = response;
      var coldat = { ...cols, ...dat };
      console.log(coldat)
      setState(coldat);     
    })
  }, []); // let op, je moet die lege array toevoegen, zo niet, endless loop!

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

export default {
  routeProps: {
    path: '/matuitable',
    component: matui
  },
  name: 'Material UI table',
}