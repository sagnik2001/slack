import React from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioPreview = ({ audioUrl }) => {
  console.log(audioUrl);
  return (
    <ReactAudioPlayer
      class="play"
      src={audioUrl}
      controls
      autoplay
      style={{ display: "block", marginTop: "1rem" }}
    />
  );
};
export default AudioPreview;
