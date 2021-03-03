const Statistics = ({ wins, setPage }) => {
  return (
    <>
      <div className="game-menu-wrapper">
        <p
          style={{
            fontSize: "xx-large",
            textTransform: "uppercase",
            marginBottom: "15px",
          }}
        >
          Records Table
        </p>

        <table
          className="records-table"
          style={{ marginBottom: "60px", fontSize: "15px" }}
        >
          <thead>
            <tr>
              <th className="records-table__blue">Name</th>
              <th className="records-table__green">Easy</th>
              <th className="records-table__yellow">Normal</th>
              <th className="records-table__red">Hard</th>
              <th className="records-table__blue">Total Wins</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="records-table__black">You</td>
              <td>{wins.easy}</td>
              <td>{wins.normal}</td>
              <td>{wins.hard}</td>
              <td className="records-table__black">
                {wins.easy + wins.normal + wins.hard}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className="game-menu-wrapper__red-button"
          onClick={() => setPage("settings")}
        >
          <p>
            <span className="bg"></span>
            <span className="base"></span>
            <span className="text">Exit</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Statistics;
