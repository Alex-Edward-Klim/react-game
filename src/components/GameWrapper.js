import React, { useEffect, useState } from "react";

import Game from "./Game";
import GameState from "./GameState";

const GameWrapper = ({
  color,
  lane,
  startTimer,
  stopTimer,
  pauseCompleted,
  resumeCompleted,
  paused,
  setPaused,
  logGameStatistics,
  finished,
  resized,
  setResized,
  wins,
  setPage,
  instructions,
  setInstruction,
  musicVolume,
  soundsVolume,
}) => {
  const [gameSize, setGameSize] = useState(
    Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    )
  );

  const startRace = () => {
    if (paused) {
      setPaused(false);
      setResized(false);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setPaused(true);
      setGameSize(
        Math.min(
          document.documentElement.clientWidth,
          document.documentElement.clientHeight
        )
      );
      if (!paused) {
        setResized(true);
      }
    };
    window.addEventListener("resize", handleWindowResize);

    const handlePause = (e) => {
      if (e.repeat) {
        return;
      }

      if (e.code === "Escape") {
        if (!paused) {
          logGameStatistics(false);
        }
      }

      if (e.code === "Enter") {
        if (paused) {
          setPaused(false);
          setResized(false);
          setInstruction(false);
        }
      }
    };
    window.addEventListener("keydown", handlePause);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handlePause);
    };
  }, [gameSize, paused]);

  return (
    <>
      {paused ? (
        <GameState
          startRace={startRace}
          finished={finished}
          resized={resized}
          setResized={setResized}
          wins={wins}
          setPage={setPage}
          instructions={instructions}
          setInstruction={setInstruction}
        />
      ) : (
        <>
          <Game
            gameSize={gameSize}
            color={color}
            lane={lane}
            startTimer={startTimer}
            stopTimer={stopTimer}
            pauseCompleted={pauseCompleted}
            resumeCompleted={resumeCompleted}
            musicVolume={musicVolume}
            soundsVolume={soundsVolume}
          />
        </>
      )}
    </>
  );
};

export default React.memo(GameWrapper);
