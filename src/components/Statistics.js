const Statistics = ({ wins, setPage }) => {
  return (
    <>
      <h1>Wins:</h1>
      <p>Easy: {wins.easy}</p>
      <p>Normal: {wins.normal}</p>
      <p>Hard: {wins.hard}</p>
      <p>Total: {wins.easy + wins.normal + wins.hard}</p>
      <button onClick={() => setPage("settings")}>Go To Settings</button>
    </>
  );
};

export default Statistics;
