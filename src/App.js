import React, { Component } from 'react';

import { observer } from "mobx-react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';


import logo from './logo.svg';
import { actions } from './actions/referenceData';


import AddComponent from './components/AddComponent';
import CommentComponent from './components/CommentsComponent';
// components
import NavBarComponent from './components/NavBarComponent';
import SideMenuComponent from './components/SideMenuComponent';
import ReleaseNoteListComponent from './components/ReleaseNoteListComponent';
import DownloadComponent from './components/DownloadComponent';
import PagingComponent from './components/PagingComponent'


import './components/App.css';

import modules from './modules'; // All the parent knows is that it has modules ...


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
                <Route path="/paging" component={PagingComponent} />




              



                {modules.map(module => (
                  <Route {...module.routeProps} key={module.name} />
                ))}
              </div>



            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
