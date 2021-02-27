import { useEffect, useRef, useState } from "react";
import GameWrapper from "./GameWrapper";

const Panel = () => {

  //
  console.log('render');

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [timer, setTimer] = useState(60);

  // const [timerIsActive, setTimerIsActive] = useState(false);
  
  const interval = useRef(null);

  const tick = () => {
    setTimer(prevTimer => prevTimer - 1);
  };

  const startTimer = () => {
    interval.current = setInterval(tick, 1000);
    // setTimerIsActive(true);
  };

  const stopTimer = () => {
    clearInterval(interval.current)
    // setTimerIsActive(false);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [completed, setCompleted] = useState(0);
  
  const completedInterval = useRef(null);

  const completedTick = () => {
    setCompleted(prevCompleted => prevCompleted + 1);
  };

  const resumeCompleted = () => {
    completedInterval.current = setInterval(completedTick, 100);
  };

  const pauseCompleted = () => {
    clearInterval(completedInterval.current)
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [paused, setPaused] = useState(false);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const logGameStatistics = (finished) => {

    pauseCompleted();
    stopTimer();

    if (finished) {
      console.log('finished: ', finished);
      setPaused(true);
    } else {
      console.log('finished: ', finished);
      setPaused(true);
    }

    setTimer(prevTimer => {
      console.log('timer: ', prevTimer);
      return 60;
    });
    setCompleted(prevCompleted => {
      console.log('completed: ', prevCompleted);
      return 0;
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  // useEffect(() => {
  //   startTimer();
  //   resumeCompleted();
  // }, []);



  return (
    <>
      <div className="panel">
        <p>Timer: {timer}</p>
        {/* <button onClick={stopTimer}>Stop</button>
        <button disabled={timerIsActive} onClick={startTimer}>Resume</button> */}
  
        <p>Completed: {completed}%</p>
        {/* <button onClick={pauseCompleted}>Pause Completed</button>
        <button onClick={resumeCompleted}>Resume Completed</button> */}
      </div>

      <GameWrapper startTimer={startTimer} stopTimer={stopTimer} pauseCompleted={pauseCompleted} resumeCompleted={resumeCompleted} paused={paused} setPaused={setPaused} logGameStatistics={logGameStatistics} />
    </>
  );
};

export default Panel;
