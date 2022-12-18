import React from "react";

const Player = ({ song }) => {
  return (
    <div className="playerFrame">
      <img src={song.cover} width="400px" alt="img" />
      <div className="trackDetails">
        <p>
          <span>{song.name}</span>
        </p>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default Player;
