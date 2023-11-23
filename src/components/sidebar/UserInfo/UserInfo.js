import React from "react";
import { Grid, Header, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import "./UserInfo.css";
import { useNavigate } from "react-router";

const UserInfo = (props) => {
  const naviagte = useNavigate()



  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user signed out");
        naviagte("/login")
      })
      .catch((e) => {
        console.log("error", e)
      })
  };

  if (props.user) {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row className="userinfo_grid_row">
            <Header inverted as="h2">
              <Header.Content>Chatify</Header.Content>
            </Header>
            <Header className="userinfo_displayname" inverted as="h4">
              {/* <Dropdown
                trigger={
                  <span>
                    <Image src={props.user.photoURL} avatar></Image>
                    {props.user.displayName}
                  </span>
                }
                options={getDropDownOptions()}
              ></Dropdown> */}
              <Dropdown text={
                <span>
                  <Image src={props.user.photoURL} avatar></Image>
                  {props.user.displayName}
                </span>
              }>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={signOut} text={<span >Sign Out</span>} />
                </Dropdown.Menu>
              </Dropdown>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(UserInfo);