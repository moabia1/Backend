import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const MoodSong = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlay = (index) => {
    setIsPlaying(isPlaying === index ? null : index);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 w-full md:w-[450px] flex flex-col gap-5 text-white transition-transform duration-300 hover:scale-[1.02]">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Recommended Songs
      </h1>

      {music.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No songs yet... detect your mood first 🎧
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {music.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-2xl shadow-md">
                  <i className="ri-music-2-fill" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-300">{song.artist}</p>
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
                  className="hover:scale-110 text-white transition-transform duration-200"
                >
                  {isPlaying === index ? (
                    <i className="ri-pause-circle-fill text-pink-400" />
                  ) : (
                    <i className="ri-play-circle-fill text-green-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSong;
