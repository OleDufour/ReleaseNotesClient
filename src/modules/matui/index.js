import React from 'react';
import MaterialTable from 'material-table';
import ReferenceStore from '../../store/ReferenceStore';

var data=null;

function componentDidMount() {

    data=  ReferenceStore.getAllReferenceData();

    // alert(referenceStore.showNonReleaseInfo);
  }

    function matui() {

       // ReferenceStore.referenceDataDefault.filter(x => x.propertyName === "Release")
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'Rotterdam', 63: 'amsterdam' },
      },
    ],
    data: [
      { name: 'jansen', surname: 'kees', birthYear: 1987, birthCity: 63 },
      {
        name: ' ole',
        surname: 'dufour',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  state.data=data;
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