import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import { connect } from "react-redux";
import ImageUpload from "../ImageUpload/ImageUpload";
import { v4 as uuidv4 } from "uuid";
import AudioUpload from "../AudioUpload/AudioUpload";

const MessageInput = (props) => {
  const messageRef = firebase.database().ref("messages");

  const [messageState, setMessageState] = useState("");

  const [fileDialogState, setFileDialog] = useState(false);
  const [audioDialogState, setAudioDialog] = useState(false);

  const createMessageInfo = (downloadUrl) => {

    let image = "",
      audio = "",
      doc = "";
    if (downloadUrl && downloadUrl.includes("image")) {
      image = downloadUrl;
    }
    if (downloadUrl && downloadUrl.includes("audio")) {
      audio = downloadUrl;
    }
    // if (downloadUrl && downloadUrl.includes("audio")) {
    //   doc = downloadUrl;
    // }
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: messageState,
      image: image,
      audio: audio,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
  };

  const sendMessage = (downloadUrl) => {
    if (messageState || downloadUrl) {
      messageRef
        .child(props.channel.id)
        .push()
        .set(createMessageInfo(downloadUrl))
        .then(() => setMessageState(""))
        .catch((err) => console.log(err));
    }
  };

  const onMessageChange = (e) => {
    const target = e.target;
    setMessageState(target.value);
  };

  const createActionButtons = () => {
    return (
      <>
        <Button
          icon="send"
          onClick={() => {
            sendMessage();
          }}
        />
        <Button icon="upload" onClick={() => setFileDialog(true)} />
      </>
    );
  };
  const attachFile = (file, contentType) => {
    console.log(file, contentType, 'jii');

    let storageRef = {}, filePath = "";

    if (contentType === 'image/png') {
      storageRef = firebase.storage().ref("images");
      console.log(typeof (storageRef))
      filePath = `chat/images/${uuidv4()}.jpg`;
    }
    else if (contentType === 'audio/mpeg') {
      console.log('audio')
      storageRef = firebase.storage().ref("audio");
      filePath = `chat/audio/${uuidv4()}.mp3`;

    }
    else if (contentType === 'application/pdf') {
      storageRef = firebase.storage().ref("doc");
      filePath = `chat/doc/${uuidv4()}.docx`;
    }

    storageRef
      .child(filePath)
      .put(file, { contentType: contentType })
      .then((data) => {
        data.ref
          .getDownloadURL()
          .then((url) => {
            sendMessage(url);
            console.log(url, 'final url')
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  // const uploadImage = (file, contentType) => {
  //   const storageRef = firebase.storage().ref("images");
  //   const filePath = `chat/images/${uuidv4()}.jpg`;

  //   storageRef
  //     .child(filePath)
  //     .put(file, { contentType: contentType })
  //     .then((data) => {
  //       data.ref
  //         .getDownloadURL()
  //         .then((url) => {
  //           sendMessage(url);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const uploadAudio = (file, contentType) => {
  //   const storageRef = firebase.storage().ref("audio");

  //   const audioPath = `chat/audio/${uuidv4()}.mp3`;

  //   storageRef
  //     .child(audioPath)
  //     .put(file, { contentType: contentType })
  //     .then((data) => {
  //       data.ref
  //         .getDownloadURL()
  //         .then((url) => {
  //           sendMessage(url);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const uploadDoc = (file, contentType) => {
  //   const storageRef = firebase.storage().ref("doc");

  //   const audioPath = `chat/doc/${uuidv4()}.pdf`;

  //   storageRef
  //     .child(audioPath)
  //     .put(file, { contentType: contentType })
  //     .then((data) => {
  //       data.ref
  //         .getDownloadURL()
  //         .then((url) => {
  //           // sendMessage(url);
  //           console.log(url,'doc url');
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <Segment style={{ backgroundColor: "rgb(180,180,185)", height: '8%' }}>
      <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label={createActionButtons()}
        labelPosition="right"
      />
      <ImageUpload
        uploadImage={attachFile}
        open={fileDialogState}
        onClose={() => setFileDialog(false)}
      />
      {/* <AudioUpload
        uploadAudio={uploadAudio}
        open={audioDialogState}
        onClose={() => setAudioDialog(false)}
      /> */}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};
export default connect(mapStateToProps)(MessageInput);
