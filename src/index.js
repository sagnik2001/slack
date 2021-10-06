import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import Register from "./Components/Register/Register";
import LogIn from "./Components/LogIn/LogIn";
import firebase from "./Components/database/Firebase";


import "semantic-ui-css/semantic.min.css"


const Index = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        props.history.push("/");
      } else {

        props.history.push("/login");
      }
    })
  }, []);


  return (
    <Switch>
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Switch>)
}



const IndexWithRouter = withRouter(Index);

ReactDOM.render(
  <React.StrictMode>

      <Router>
        <IndexWithRouter />
      </Router>

  </React.StrictMode>,
  document.getElementById('root')
);
