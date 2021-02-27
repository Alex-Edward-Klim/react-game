import { useEffect, useRef, useState } from "react";

const Panel = () => {

  console.log('render');

  const [timer, setTimer] = useState(5);

  const [timerIsActive, setTimerIsActive] = useState(true);
  
  const interval = useRef(null);

  const tick = () => {
    setTimer(prevTimer => prevTimer - 1);
  };

  const startTimer = () => {
    interval.current = setInterval(tick, 1000);
    setTimerIsActive(true);
  };

  const stopTimer = () => {
    clearInterval(interval.current)
    setTimerIsActive(false);
  };



  useEffect(() => {
    if (timerIsActive) {
      startTimer();
    }

    if (timer <= 0) {
      stopTimer();
      console.log('finished');
      setTimer(5);
    }
    return stopTimer;
  }, [timer]);

  return (
    <>
      <div className="panel">
        <p>Timer: {timer}</p>
        <button onClick={stopTimer}>Stop</button>
        <button disabled={timerIsActive} onClick={startTimer}>Resume</button>
      </div>
    </>
  );
};

export default Panel;
