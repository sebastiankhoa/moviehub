import React from "react";
import ReactPlayer from "react-player";

const ContentModal = ({ videoUrl }) => {
  // console.log({ videoUrl });
  return <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl}`} controls={true} playing={true} width="100%" height="100%" />;
};

export default ContentModal;
