import { useEffect, useRef, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";

import Panel from "./components/Panel";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";

import clickSound from "./sounds/click.wav";

const App = () => {
  const loadFromLocalStorage = () => {
    const storage = JSON.parse(
      localStorage.getItem("ZelenoglazoeTaxiRacingGame")
    );

    return {
      level: storage ? storage.level : false,
      color: storage ? storage.color : false,
      lane: storage ? storage.lane : false,
      page: storage ? storage.page : false,
      wins: storage ? JSON.parse(storage.wins) : false,
      finished: storage ? JSON.parse(storage.finished) : false,
      instructions: storage ? JSON.parse(storage.instructions) : true,
      resized: storage ? JSON.parse(storage.resized) : false,
      musicVolume: storage ? +JSON.parse(storage.musicVolume) : 5,
      soundsVolume: storage ? +JSON.parse(storage.soundsVolume) : 5,
    };
  };

  const [level, setLevel] = useState(loadFromLocalStorage().level || "normal");

  const [color, setColor] = useState(loadFromLocalStorage().color || "yellow");

  const [lane, setLane] = useState(loadFromLocalStorage().lane || "3");

  const [page, setPage] = useState(loadFromLocalStorage().page || "settings");

  const initialWins = {
    easy: 0,
    normal: 0,
    hard: 0,
  };
  const [wins, setWins] = useState(loadFromLocalStorage().wins || initialWins);

  const [finished, setFinished] = useState(
    loadFromLocalStorage().finished || false
  );

  const [instructions, setInstruction] = useState(
    loadFromLocalStorage().instructions
  );

  const [resized, setResized] = useState(
    loadFromLocalStorage().resized || false
  );

  const [musicVolume, setMusicVolume] = useState(
    loadFromLocalStorage().musicVolume
  );
  const [soundsVolume, setSoundsVolume] = useState(
    loadFromLocalStorage().soundsVolume
  );

  const saveToLocalStorage = () => {
    const data = {
      level,
      color,
      lane,
      page,
      wins: JSON.stringify(wins),
      finished: JSON.stringify(finished),
      instructions: JSON.stringify(instructions),
      resized: JSON.stringify(resized),
      musicVolume: JSON.stringify(musicVolume),
      soundsVolume: JSON.stringify(soundsVolume),
    };

    localStorage.setItem("ZelenoglazoeTaxiRacingGame", JSON.stringify(data));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [
    level,
    color,
    lane,
    page,
    wins,
    finished,
    instructions,
    resized,
    musicVolume,
    soundsVolume,
  ]);

  const handleFullScreenMode = () => {
    if (document.fullscreenEnabled) {
      if (!window.screenTop && !window.screenY) {
        const gameAppRef = document;
        const browserFullScreenRef =
          gameAppRef.cancelFullScreen ||
          gameAppRef.webkitCancelFullScreen ||
          gameAppRef.mozCancelFullScreen ||
          gameAppRef.msCancelFullScreen;
        browserFullScreenRef.call(gameAppRef);
      } else {
        const gameAppRef = document.documentElement;
        const browserFullScreenRef =
          gameAppRef.requestFullscreen ||
          gameAppRef.webkitRequestFullScreen ||
          gameAppRef.mozRequestFullScreen ||
          gameAppRef.msRequestFullscreen;
        browserFullScreenRef.call(gameAppRef);
      }
    }
  };

  const changeFullScreenViaKeyV = (e) => {
    if (e.repeat) {
      return;
    }

    if (e.code === "KeyV") {
      handleFullScreenMode();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", changeFullScreenViaKeyV);

    return () => {
      window.removeEventListener("keydown", changeFullScreenViaKeyV);
    };
  }, []);

  const winTheRace = () => {
    if (level === "easy") {
      setWins((prevWins) => ({
        ...prevWins,
        easy: prevWins.easy + 1,
      }));
    } else if (level === "normal") {
      setWins((prevWins) => ({
        ...prevWins,
        normal: prevWins.normal + 1,
      }));
    } else if (level === "hard") {
      setWins((prevWins) => ({
        ...prevWins,
        hard: prevWins.hard + 1,
      }));
    }
  };

  const clickSoundRef = useRef(null);

  const playClickSound = () => {
    clickSoundRef.current.currentTime = 0;
    clickSoundRef.current.play();
  };

  return (
    <>
      <audio ref={clickSoundRef} style={{ display: "none" }}>
        <source src={clickSound} type="audio/mpeg" />
      </audio>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <>
                <div className="game-menu-wrapper">
                  <h1
                    style={{
                      fontSize: "xxx-large",
                      marginBottom: "50px",
                      textAlign: "center",
                    }}
                  >
                    RACING GAME
                  </h1>
                  <Link
                    to="/play"
                    className="game-menu-wrapper__green-button"
                    onClick={() => {
                      playClickSound();
                      setPage("settings");
                      setInstruction(true);
                      setResized(false);
                    }}
                  >
                    <p>
                      <span className="bg"></span>
                      <span className="base"></span>
                      <span className="text">Play</span>
                    </p>
                  </Link>
                  <Footer />
                </div>
              </>
            );
          }}
        />
        <Route
          path="/play"
          exact
          render={() => {
            return (
              <>
                {page === "settings" ? (
                  <Settings
                    color={color}
                    lane={lane}
                    level={level}
                    musicVolume={musicVolume}
                    setMusicVolume={setMusicVolume}
                    soundsVolume={soundsVolume}
                    setSoundsVolume={setSoundsVolume}
                    setColor={setColor}
                    setLane={setLane}
                    setLevel={setLevel}
                    setPage={setPage}
                  />
                ) : null}
                {page === "game" ? (
                  <Panel
                    color={color}
                    finished={finished}
                    instructions={instructions}
                    lane={lane}
                    level={level}
                    musicVolume={musicVolume}
                    soundsVolume={soundsVolume}
                    resized={resized}
                    setFinished={setFinished}
                    setInstruction={setInstruction}
                    setPage={setPage}
                    setResized={setResized}
                    wins={wins}
                    winTheRace={winTheRace}
                  />
                ) : null}
                {page === "statistics" ? (
                  <Statistics wins={wins} setPage={setPage} />
                ) : null}
              </>
            );
          }}
        />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
