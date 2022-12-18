import { useRef, useState, useEffect } from "react";
import chillHop from "./db/db";
import "./App.css";
import Player from "./components/Player";
import {
  BiPlayCircle,
  BiChevronLeft,
  BiChevronRight,
  BiPause,
} from "react-icons/bi";

function App() {
  const [song, setSong] = useState(chillHop);
  const [isPlaying, setIsPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  //play and pause the song:
  const playSong = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(usedPlayButton);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  //next song:
  const nextSong = () => {
    setIndex(index + 1);
  };

  //previous song:
  const prevSong = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
    setIndex(0);
  };

  const usedPlayButton = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(usedPlayButton);
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleClick = (id, idx) => {
    setIndex(idx);
  };

  return (
    <div className="App">
      <header className="header">
        <h2>Library</h2>
        {song.map((s, idx) => (
          <div className="trackList">
            <img src={s.cover} width="50" alt="listTrackImg" />
            <div className="trackList__artist">
              <p onClick={() => handleClick(s.id, idx)} key={s.id}>
                {s.name}
              </p>
              <p>{s.artist}</p>
            </div>
          </div>
        ))}
      </header>

      <section>
        <Player song={song[index]} />
        <div className="player">
          <div className="btnGroup">
            <button onClick={prevSong}>
              <BiChevronLeft />
            </button>
            <button onClick={playSong}>
              {isPlaying ? <BiPlayCircle /> : <BiPause />}
            </button>
            <button onClick={nextSong}>
              <BiChevronRight />
            </button>
          </div>

          <audio ref={audioPlayer} src={song[index].audio} type="audio/mpeg" />

          <div className="scrollContainer">
            <p>{calculateTime(currentTime)}</p>
            <input
              ref={progressBar}
              className={progressBar}
              type="range"
              defaultValue="0"
              onChange={changeRange}
            />
            <p>{duration && calculateTime(duration)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
