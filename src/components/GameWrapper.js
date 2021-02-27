import React, { useEffect, useState } from "react";

import Game from "./Game";

const GameWrapper = ({startTimer, stopTimer, pauseCompleted, resumeCompleted, paused, setPaused, logGameStatistics }) => {
  const [gameSize, setGameSize] = useState(
    Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    )
  );
  // const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setPaused(true);
      setGameSize(
        Math.min(
          document.documentElement.clientWidth,
          document.documentElement.clientHeight
        )
      );
    };
    window.addEventListener("resize", handleWindowResize);

    let logStats = true;
    const handlePause = (e) => {
      if (e.repeat) {
        return;
      }

      if (e.code === "Escape") {
        // paused ? setPaused(false) : setPaused(true);

        // setPaused(true);
        if (logStats) {
          logStats = false;
          logGameStatistics(false);
        }
      }

      if (e.code === "Enter") {
        logStats = true;
        setPaused(false);
      }
    };
    window.addEventListener("keydown", handlePause);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handlePause);
    };
  }, [gameSize, paused]);

  return <>{paused ? <h1>Paused</h1> : <Game gameSize={gameSize} startTimer={startTimer} stopTimer={stopTimer} pauseCompleted={pauseCompleted} resumeCompleted={resumeCompleted} />}</>;
};

export default React.memo(GameWrapper);
