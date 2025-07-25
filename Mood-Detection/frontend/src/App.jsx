import { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import MoodSong from "./components/MoodSong";

function App() {
  const [song, setSong] = useState([]);
  return (
    <div className="flex bg-zinc-500 p-20 w-full h-screen">
      <FacialExpression setsong={setSong}/>
      <MoodSong music={song}/>
    </div>
  )
}

export default App;
