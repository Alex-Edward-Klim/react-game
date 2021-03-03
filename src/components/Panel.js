import { useEffect, useRef, useState } from "react";
import GameWrapper from "./GameWrapper";

const Panel = ({
  color,
  level,
  lane,
  finished,
  setFinished,
  resized,
  setResized,
  winTheRace,
  wins,
  setPage,
  instructions,
  setInstruction,
  musicVolume,
  soundsVolume,
}) => {
  const setDifficultyLevel = () => {
    if (level === "easy") {
      return 250;
    } else if (level === "normal") {
      return 400;
    } else if (level === "hard") {
      return 550;
    }
  };

  const [timer, setTimer] = useState(60);

  const interval = useRef(null);

  const tick = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  const startTimer = () => {
    interval.current = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    clearInterval(interval.current);
  };

  const [completed, setCompleted] = useState(0);

  const completedInterval = useRef(null);

  const completedTick = () => {
    setCompleted((prevCompleted) => prevCompleted + 1);
  };

  const resumeCompleted = () => {
    completedInterval.current = setInterval(
      completedTick,
      setDifficultyLevel()
    );
  };

  const pauseCompleted = () => {
    clearInterval(completedInterval.current);
  };

  const [paused, setPaused] = useState(true);

  const logGameStatistics = (finished) => {
    pauseCompleted();
    stopTimer();

    if (finished) {
      setFinished(finished);
      winTheRace();
      setPaused(true);
    } else {
      setFinished(finished);
      setPaused(true);
    }

    setTimer((prevTimer) => {
      return 60;
    });
    setCompleted((prevCompleted) => {
      return 0;
    });
  };

  useEffect(() => {
    if (timer <= 0) {
      logGameStatistics(false);
    }
    return () => stopTimer;
  }, [timer]);

  useEffect(() => {
    if (completed >= 100) {
      logGameStatistics(true);
    }
    return () => pauseCompleted;
  }, [completed]);

  const dashboardWidth = Math.min(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );

  const dashboardWrapperStyle = {
    width: `${dashboardWidth}px`,
    marginLeft: `${Math.floor(
      (document.documentElement.clientWidth - dashboardWidth) / 2
    )}px`,
  };

  const dashboardTimerAndCompletedWidth = Math.floor(dashboardWidth / 7);
  const dashboardTimerAndCompletedHeight = Math.floor(
    dashboardTimerAndCompletedWidth / 2
  );
  const dashboardTimerAndCompletedMargin = Math.ceil(dashboardWidth / 36);
  const dashboardStyle = {
    width: `${dashboardTimerAndCompletedWidth}px`,
    height: `${dashboardTimerAndCompletedHeight}px`,
    lineHeight: `${dashboardTimerAndCompletedHeight}px`,
    fontSize: `${dashboardTimerAndCompletedMargin}px`,
  };
  const dashboardTimerStyle = {
    ...dashboardStyle,
    marginLeft: `${dashboardTimerAndCompletedMargin}px`,
  };
  const dashboardCompletedStyle = {
    ...dashboardStyle,
    marginRight: `${dashboardTimerAndCompletedMargin}px`,
  };

  return (
    <>
      {!paused ? (
        <>
          <div style={dashboardWrapperStyle} className="dashboardWrapper">
            <div style={dashboardTimerStyle} className="dashboard-timer">
              {timer}
            </div>
            <div
              style={dashboardCompletedStyle}
              className="dashboard-completed"
            >
              {completed}%
            </div>
          </div>
        </>
      ) : null}

      <GameWrapper
        color={color}
        lane={lane}
        startTimer={startTimer}
        stopTimer={stopTimer}
        pauseCompleted={pauseCompleted}
        resumeCompleted={resumeCompleted}
        paused={paused}
        setPaused={setPaused}
        logGameStatistics={logGameStatistics}
        finished={finished}
        resized={resized}
        setResized={setResized}
        wins={wins}
        setPage={setPage}
        instructions={instructions}
        setInstruction={setInstruction}
        musicVolume={musicVolume}
        soundsVolume={soundsVolume}
      />
    </>
  );
};

export default Panel;
