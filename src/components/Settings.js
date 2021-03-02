import { Link } from "react-router-dom";

const Settings = ({
  level,
  setLevel,
  color,
  setColor,
  lane,
  setLane,
  setPage,
}) => {
  return (
    <>
      <div className="game-menu-wrapper">
        <label htmlFor="level">Difficulty Level:</label>
        <select
          value={level}
          id="level"
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">easy</option>
          <option value="normal">normal</option>
          <option value="hard">hard</option>
        </select>

        <label htmlFor="color">Auto Color:</label>
        <select
          value={color}
          id="color"
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="red">red</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select>

        <label htmlFor="lane">Start in Lane:</label>
        <select
          value={lane}
          id="lane"
          onChange={(e) => setLane(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <div
          className="game-menu-wrapper__green-button"
          onClick={() => setPage("game")}
        >
          <p>
            <span className="bg"></span>
            <span className="base"></span>
            <span className="text">Start Race</span>
          </p>
        </div>

        <div
          className="game-menu-wrapper__yellow-button white"
          onClick={() => setPage("statistics")}
        >
          <p>
            <span className="bg"></span>
            <span className="base"></span>
            <span className="text">Show Records</span>
          </p>
        </div>

        <Link to="/" className="game-menu-wrapper__red-button">
          <p>
            <span className="bg"></span>
            <span className="base"></span>
            <span className="text">Exit</span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default Settings;
