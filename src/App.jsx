import React from "react";
import GameTable from "./components/GameTable";
import './styles/styles.css';

function App() {
  return (
    <div className="app-container">
      <h1>Cross Logic Puzzle</h1>
      <GameTable />
    </div>
  );
}

export default App;
