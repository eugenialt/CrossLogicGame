import React from "react";
import './styles/styles.css';
import { LevelOne } from "./Page/LevelOne";
import { Routes, Route } from "react-router-dom";
import { LevelTwo } from "./Page/LevelTwo";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LevelOne />} />
      <Route path="/levelTwo" element={<LevelTwo />} />
    </Routes>
    </>
  );
}

export default App;
