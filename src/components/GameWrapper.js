import { useEffect, useState } from "react";

import Game from "./Game";

const GameWrapper = () => {
  const [gameSize, setGameSize] = useState(
    Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    )
  );
  const [paused, setPaused] = useState(false);

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

    const handlePause = () => {
      paused ? setPaused(false) : setPaused(true);
    };
    window.addEventListener("click", handlePause);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("click", handlePause);
    };
  }, [gameSize, paused]);

  return <>{paused ? <h1>Paused</h1> : <Game gameSize={gameSize} />}</>;
};

export default GameWrapper;
