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
          <div className="game-menu-wrapper">
            <h1 style={{ fontSize: "xx-large", marginBottom: "25px" }}>
              Browser Window RESIZED
            </h1>
            <p style={{ fontSize: "x-large", marginBottom: "25px" }}>
              Your progress SAVED
            </p>
            <p
              style={{ fontSize: "large", marginBottom: "25px" }}
            >{`Total race wins: ${wins.easy + wins.normal + wins.hard}`}</p>

            <p style={{ fontSize: "large" }}>(Press ENTER or click below)</p>

            <div
              className="game-menu-wrapper__green-button"
              onClick={startRace}
            >
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Continue Racing</span>
              </p>
            </div>

            <div
              className="game-menu-wrapper__red-button"
              onClick={() => {
                setPage("settings");
                setInstruction(true);
                setResized(false);
              }}
            >
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Exit</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {instructions ? (
            <>
              <div className="game-menu-wrapper">
                <p style={{ marginBottom: "15px", fontSize: "xxx-large" }}>
                  Hot Keys
                </p>

                <table
                  className="controls-table"
                  style={{ marginBottom: "25px" }}
                >
                  <thead>
                    <tr>
                      <th>Control</th>
                      <th>Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Move Right</td>
                      <td>Right Arrow</td>
                    </tr>
                    <tr>
                      <td>Move Left</td>
                      <td>Left Arrow</td>
                    </tr>
                    <tr>
                      <td>Full Screen</td>
                      <td>V</td>
                    </tr>
                    <tr>
                      <td>Pause</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>Race</td>
                      <td>Enter</td>
                    </tr>
                    <tr>
                      <td>Exit</td>
                      <td>Escape</td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ fontSize: "large" }}>
                  (Press ENTER or click below)
                </p>

                <div
                  className="game-menu-wrapper__green-button"
                  onClick={() => {
                    startRace();
                    setInstruction(false);
                  }}
                >
                  <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Start Race</span>
                  </p>
                </div>

                <div
                  className="game-menu-wrapper__yellow-button white"
                  onClick={() => {
                    setPage("settings");
                    setInstruction(true);
                  }}
                >
                  <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Game Settings</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="game-menu-wrapper">
                <p style={{ fontSize: "xxx-large", marginBottom: "25px" }}>
                  {finished ? "YOU WIN" : "YOU LOST"}
                </p>

                <p style={{ fontSize: "x-large" }}>
                  {finished
                    ? `Total race wins: ${wins.easy + wins.normal + wins.hard}`
                    : null}
                </p>

                <div
                  className="game-menu-wrapper__yellow-button white"
                  onClick={() => {
                    setPage("statistics");
                    setInstruction(true);
                  }}
                >
                  <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Show Records</span>
                  </p>
                </div>

                <p style={{ fontSize: "large" }}>
                  (Press ENTER or click below)
                </p>

                <div
                  className="game-menu-wrapper__green-button"
                  onClick={startRace}
                >
                  <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">
                      {finished ? "START NEW RACE" : "RACE AGAIN"}
                    </span>
                  </p>
                </div>

                <div
                  className="game-menu-wrapper__red-button"
                  onClick={() => {
                    setPage("settings");
                    setInstruction(true);
                  }}
                >
                  <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Exit</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameState;
