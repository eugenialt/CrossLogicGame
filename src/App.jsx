import React from "react";
import './styles/styles.css';
import { LevelOne } from "./Page/LevelOne";
import { Routes, Route } from "react-router-dom";
import { LevelTwo } from "./Page/LevelTwo";
import {LevelThree} from "./Page/LevelThree"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LevelOne />} />
      <Route path="/levelTwo" element={<LevelTwo />} />
      <Route path="/levelThree" element={<LevelThree />} />
    </Routes>
    </>
  );
}

export default App;
