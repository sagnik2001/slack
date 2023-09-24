import React from "react";
import { useState } from "react";
import "./Auth.css";
import firebase from "../../server/firebase";
import {
  Form,
  Segment,
  Icon,
  Header,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import login from "../../images/login.png";

const Login = () => {
  let user = {
    email: "",
    password: "",
  };
  let errors = [];

  const [User, setUser] = useState(user);
  const [isSuccess, SetSuccess] = useState(false);
  const [Error, setError] = useState(errors);
  const [isLoading, SetLoading] = useState(false);


  const handleInput = (event) => {
    let target = event.target;
    setUser((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    SetSuccess(false);
    setError(() => []);
    if (checkform()) {
      SetLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(User.email, User.password)
        .then((user) => {
          SetLoading(false);
        })
        .catch((servererr) => {
          SetLoading(false);
          setError((error) => error.concat(servererr));
        });
    }
  };
  const checkform = () => {
    if (isFormEmpty()) {
      setError((error) =>
        error.concat({ message: "Please fill in all the fields" })
      );
      return false;
    }

    return true;
  };
  const isFormEmpty = () => {
    return !User.password.length || !User.email.length;
  };
  const formaterrors = () => {
    return Error.map((err, index) => <p key={index}>{err.message}</p>);
  };
  return (
    <div className="main_container">
      <div className="left_container">
        <Header icon as="h1">
          Login
        </Header>

        <Form onSubmit={onSubmitHandler}>
          <Segment stacked>
            <Form.Input
              name="email"
              value={User.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="UserEmail"
            />
            <Form.Input
              name="password"
              value={User.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Password"
            />
          </Segment>
          <Button
            disabled={isLoading}
            loading={isLoading}
            style={{ backgroundColor: "#611f69", color: "white" }}
          >
            <Icon name=" sign-in" />
            Login
          </Button>
        </Form>
        {Error.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}

        <Message>
          Dont have a account? <Link to="/register">Register</Link>
        </Message>
      </div>
      <div className="right_container">
        <img src={login} className="logo" alt="right" />
      </div>
    </div>
  );
};
export default Login;
