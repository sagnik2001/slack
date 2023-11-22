import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import { Menu, Icon, Image } from "semantic-ui-react";
import { setChannel } from "../../../store/actioncreator";
import Notifications from "../Notifications/Notifications";

const PrivateChat = (props) => {
  const [usersState, setusersState] = useState([]);
  const [connectedusersState, setConnectedusersState] = useState([]);

  const usersRef = firebase.database().ref("users");
  //connected ref is provided by firebase to show value as true or false while connected or not
  const connectedRef = firebase.database().ref(".info/connected");

  const statusRef = firebase.database().ref("status");

  useEffect(() => {
    usersRef.on("child_added", (snap) => {
      setusersState((currentState) => {
        let updatedState = [...currentState];

        let user = snap.val();
        user.name = user.displayName;
        user.id = snap.key;
        user.isPrivateChat = true;
        updatedState.push(user);
        return updatedState;
      });
    });
    connectedRef.on("value", (snap) => {
      if (props.user && snap.val()) {
        const userStatusRef = statusRef.child(props.user.uid);
        userStatusRef.set(true);
        userStatusRef.onDisconnect().remove();
      }
    });

    return () => {
      usersRef.off();
      connectedRef.off();
    };
  }, [props.user]);

  useEffect(() => {
    statusRef.on("child_added", (snap) => {
      setConnectedusersState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.key);
        return updatedState;
      });
    });
    statusRef.on("child_removed", (snap) => {
      setConnectedusersState((currentState) => {
        let updatedState = [...currentState];
        let index = updatedState.indexOf(snap.key);
        updatedState.splice(index, 1);
        return updatedState;
      });
    });
    return () => statusRef.off();
  }, usersState);

  const displayUsers = () => {
    if (usersState.length > 0 && props.user) {
      return usersState
        ?.filter((user) => user?.id !== props?.user?.uid)
        .map((user) => {
          return (
            <Menu.Item
              key={user.id}
              name={user.name}
              onClick={() => selectUser(user)}
              active={
                props.channel && generateChannelId(user.id) === props.channel.id
              }
            >
              <Icon
                name="circle"
                style={{marginTop:"0.75rem"}}
                color={`${
                  connectedusersState.indexOf(user.id) !== -1 ? "green" : "red"
                }`}
              />
              <Image src={user.photoURL} avatar/> <span>{user.name}</span>
              <Notifications
                user={props.user}
                channel={props.channel}
                notifyId={generateChannelId(user.id)}
              />
            </Menu.Item>
          );
        });
    }
  };

  const selectUser = (user) => {
    let userTemp = { ...user };
    userTemp.id = generateChannelId(user.id);
    lastVisit(props.user, props.channel);
    lastVisit(props.user, userTemp);
    props.selectChannel(userTemp);
  };
  const lastVisit = (user, channel) => {
    const lastVisited = usersRef
      .child(user.uid)
      .child("lastVisited")
      .child(channel.id);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  };
  const generateChannelId = (userId) => {
    if (props.user.uid < userId) {
      return props.user.uid + userId;
    } else {
      return userId + props.user.uid;
    }
  };

  return (
    <Menu.Menu style={{ marginTop: "35px" }}>
      <Menu.Item style={{ fontSize: "17px" }}>
        <span>
          <Icon name="mail" />
          Direct messages
        </span>
        ({usersState.length - 1})
      </Menu.Item>
      {displayUsers()}
    </Menu.Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);
