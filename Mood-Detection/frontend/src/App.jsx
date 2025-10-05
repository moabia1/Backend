import { useState } from "react";
import Navbar from "./components/Navbar";
import FacialExpression from "./components/FacialExpression";
import MoodSong from "./components/MoodSong";

function App() {
  const [song, setSong] = useState([]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-zinc-900 to-black flex flex-col items-center pt-24 md:pt-28 gap-10 p-6 md:p-10">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
        <FacialExpression setsong={setSong} />
        <MoodSong music={song} />
      </div>
    </div>
  );
}

export default App;
