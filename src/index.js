import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from './components/Auth/Login'
import firebase from "./server/firebase";
import "semantic-ui-css/semantic.min.css"
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { combinedReducers } from './store/reducer';
import { setUser } from './store/actioncreator'
import { useNavigate } from 'react-router';
import './index.css'

const store = createStore(combinedReducers)

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />
  }
  return Wrapper;
}

const Index = (props) => {
  // console.log(props)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user)
        props.history("/");
      } else {
        props.setUser(null)
        props.history("/login");
      }
    })
  }, []);

  // console.log(props.currentUser)

  return (<>
    {/* <AppLoader loading={props.loading && props.location.pathname === "/"} /> */}

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />} />
    </Routes></>)
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    // loading: state.channel.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch(setUser(user)) }
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
