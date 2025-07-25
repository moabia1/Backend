import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const MoodSong = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlay = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="flex flex-col bg-zinc-900 p-5 gap-6 text-white rounded-2xl max-w-lg mx-auto shadow-lg">
      <h1 className="text-3xl font-semibold text-center">Recommended Songs</h1>
      {music.map((song, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-zinc-600 rounded-lg flex items-center justify-center text-2xl">
              <i className="ri-music-2-fill"></i>
            </div>
            <div>
              <h3 className="text-lg font-medium">{song.title}</h3>
              <p className="text-sm text-zinc-300">{song.artist}</p>
            </div>
          </div>
          <div className="text-3xl">
            {isPlaying === index && (
              <audio
                src={song.audio}
                autoPlay
                controls={false}
                style={{ display: "none" }}
              />
            )}
            <button
              onClick={() => handlePlay(index)}
              className="text-white hover:text-green-400 transition duration-200"
            >
              {isPlaying === index ? (
                <i className="ri-pause-circle-fill"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSong;
