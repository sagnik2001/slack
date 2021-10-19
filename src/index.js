import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider ,connect} from 'react-redux'
import {createStore} from "redux"
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { combinedReducers } from "./Components/store/reducer.js"
import Register from "./Components/Register/Register";
import LogIn from "./Components/LogIn/LogIn";
import firebase from "./Components/database/Firebase";
import {setUser} from "./Components/store/actioncreator.js"

import 'semantic-ui-css/semantic.min.css'
const store=createStore(combinedReducers);

const Index = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.setUser(null);
        props.history.push("/login");
      }
    })
  }, []);

  console.log("Debug", props.currentUser);
  return (
    <Switch>
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Switch>)
}
const mapStateToProps = (state) =>{
  return{
   currentUser: state.user.currentUser,
 }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setUser:(user)=>{dispatch(setUser(user))}
  }
}

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <Router>
        <IndexWithRouter />
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
