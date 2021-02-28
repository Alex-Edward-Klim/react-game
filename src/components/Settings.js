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
      <p>Level: {level}</p>

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
      <p>Color: {color}</p>

      <label htmlFor="lane">Start Lane:</label>
      <select value={lane} id="lane" onChange={(e) => setLane(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <p>Lane: {lane}</p>

      <button onClick={() => setPage("game")}>Start Race</button>
      <button onClick={() => setPage("statistics")}>Statistics</button>
    </>
  );
};

export default Settings;
