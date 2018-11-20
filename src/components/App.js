import React, { Component } from 'react';
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';


import logo from './../logo.svg';
import { actions } from './../actions/referenceData';


import AddComponent from './AddComponent';
import CommentComponent from './CommentsComponent';
// components
import NavBarComponent from './NavBarComponent';
import SideMenuComponent from './SideMenuComponent';
import ReleaseNoteListComponent from './ReleaseNoteListComponent';
import DownloadComponent from './DownloadComponent';

import './App.css';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { refs: [] };
    const history = createHistory();
    const unlisten = history.listen((location, action) => {
      alert(location.pathname)
      console.log(action, location.pathname, location.state)
    });
  }

  componentDidMount() {
    // actions.getAllReferenceData();


  }



  render() {
    return (
      <div class="container-fluid">
        <BrowserRouter>
          <div>
            <NavBarComponent />
            <br />
            <div class="row">
              <div class="col-md-1">
                <SideMenuComponent />
              </div>

              <div class="col-md-11">
                <Route path="/" exact component={AddComponent} />
                <Route path="/comment" component={CommentComponent} />
                <Route path="/preview" component={ReleaseNoteListComponent} />
                <Route path="/download" component={DownloadComponent} />
              </div>


            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
