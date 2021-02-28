const GameState = ({
  finished,
  startRace,
  resized,
  setResized,
  wins,
  setPage,
  instructions,
  setInstruction,
}) => {
  return (
    <>
      {resized ? (
        <>
          <h1>Browser Window RESIZED</h1>
          <p>Your progress SAVED</p>
          <p>{`Total race wins: ${wins.easy + wins.normal + wins.hard}`}</p>
          <p>
            Press ENTER or click to{" "}
            <button onClick={startRace}>CONTINUE</button>
          </p>
          <button
            onClick={() => {
              setPage("settings");
              setInstruction(true);
              setResized(false);
            }}
          >
            EXIT to Main Menu
          </button>
        </>
      ) : (
        <>
          {instructions ? (
            <>
              <h1>Instructions</h1>
              <p>
                Press ENTER or click to{" "}
                <button
                  onClick={() => {
                    startRace();
                    setInstruction(false);
                  }}
                >
                  START RACE
                </button>
              </p>
              <button
                onClick={() => {
                  setPage("settings");
                  setInstruction(true);
                }}
              >
                EXIT to Main Menu
              </button>
            </>
          ) : (
            <>
              <p>{finished ? "YOU WIN" : "YOU LOST"}</p>
              <p>
                {finished
                  ? `Total race wins: ${wins.easy + wins.normal + wins.hard}`
                  : null}
                {finished ? (
                  <button
                    onClick={() => {
                      setPage("statistics");
                      setInstruction(true);
                    }}
                  >
                    See Details
                  </button>
                ) : null}
              </p>
              <p>
                Press ENTER or click to{" "}
                <button onClick={startRace}>
                  {finished ? "START NEW RACE" : "TRY AGAIN"}
                </button>
              </p>
              <button
                onClick={() => {
                  setPage("settings");
                  setInstruction(true);
                }}
              >
                EXIT to Main Menu
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameState;
