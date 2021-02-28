import { useEffect, useState } from "react";

import Panel from "./components/Panel";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";

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
    };

    localStorage.setItem("ZelenoglazoeTaxiRacingGame", JSON.stringify(data));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [level, color, lane, page, wins, finished, instructions, resized]);

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

  return (
    <>
      {page === "settings" ? (
        <Settings
          color={color}
          lane={lane}
          level={level}
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
};

export default App;
