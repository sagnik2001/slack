import { React, useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Icon,
  Header,
  Button,
  Message,
} from "semantic-ui-react";
import firebase from "../../server/firebase";
import { Link } from "react-router-dom";
import register from "../../images/register.png";

import "./Auth.css";
const Register = () => {
  //creating default user 
  let user = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let errors = [];
  let userDatabaseCollection = firebase.database().ref("users");

  const [User, setUser] = useState(user);
  const [Error, setError] = useState(errors);
  const [isLoading, SetLoading] = useState(false);
  const [isSuccess, SetSuccess] = useState(false);

  const handleInput = (event) => {
    let target = event.target;
    setUser((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };
  const mystyle = {
    maxWidth: "500px",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "100px",
  };
  const checkform = () => {
    if (isFormEmpty()) {
      setError((error) =>
        error.concat({ message: "Please fill in all the fields" })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }

    return true;
  };
  //to check any form field is empty or not
  const isFormEmpty = () => {
    return (
      !User.username.length ||
      !User.password.length ||
      !User.email.length ||
      !User.confirmPassword.length
    );
  };
  const checkPassword = () => {
    if (User.password.length < 6) {
      setError((error) =>
        error.concat({
          message: "Given Password must be at least 6 characters",
        })
      );
      return false;
    } else if (User.password !== User.confirmPassword) {
      setError((error) => error.concat({ message: " Password doesnot match" }));
      return false;
    }
    return true;
  };
  //submit the final data to the db
  const onSubmitHandler = (event) => {
    event.preventDefault();
    SetSuccess(false);
    setError(() => []);
    if (checkform()) {
      SetLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(User.email, User.password)
        .then((createUser) => {
          SetLoading(false);
          updateUser(createUser);
        })
        .catch((servererr) => {
          SetLoading(false);
          setError((error) => error.concat(servererr));
        });
    }
  };
  //after creation of the user we need to update or add new data
  const updateUser = (createUser) => {
    if (createUser) {
      SetLoading(true);
      createUser.user
        .updateProfile({
          displayName: User.username,
          photoURL: `http://gravatar.com/avatar/${createUser.user.uid}?d=identicon`,
        })
        .then(() => {
          SetLoading(false);
          saveData(createUser);
        })
        .catch((servererr) => {
          SetLoading(false);
          setError((error) => error.concat(servererr));
        });
    }
  };
  const saveData = (createUser) => {
    SetLoading(true);
    userDatabaseCollection
      .child(createUser.user.uid)
      .set({
        displayName: createUser.user.displayName,
        photoURL: createUser.user.photoURL,
      })
      .then(() => {
        SetLoading(false);
        SetSuccess(true);
      })
      .catch((servererr) => {
        SetLoading(false);
        setError((error) => error.concat(servererr));
      });
  };
  const formaterrors = () => {
    return Error.map((err, index) => <p key={index}>{err.message}</p>);
  };
  return (
    <div className="main_container">
      <div className="left_container">
        <Header icon as="h1">
          Register
        </Header>
        <Form onSubmit={onSubmitHandler}>
          <Segment stacked>
            <Form.Input
              name="username"
              value={User.username}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="Username"
            />
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
            <Form.Input
              name="confirmPassword"
              value={User.confirmPassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>
          <Button
            disabled={isLoading}
            loading={isLoading}
            style={{ backgroundColor: "#611f69", color: "white" }}
          >
            <Icon name=" sign-in" />
            SignIn
          </Button>
        </Form>
        {Error.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already Have An Account ?{" "}
          <Link to="/login">
            &nbsp;
            <Icon name="hand point right" />
            LogIn
          </Link>
        </Message>
      </div>
      <div className="right_container">
        <img src={register} className="logo" alt="right" />
      </div>
    </div>
  );
};
export default Register;
