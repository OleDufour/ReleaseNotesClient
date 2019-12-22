import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import modules from './modules'; // All the parent knows is that it has modules ...

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
 