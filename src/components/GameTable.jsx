import React, { useState } from "react";

const correctAnswers = {
  0: { fruit: "apple", color: "red" },
  1: { fruit: "banana", color: "yellow" },
  2: { fruit: "cherry", color: "green" },
};

const GameTable = () => {
  const [result, setResult] = useState("");

  const checkAnswers = () => {
    let allCorrect = true;
    document.querySelectorAll(".answer").forEach((select) => {
      const row = select.getAttribute("data-row");
      const col = select.getAttribute("data-col");
      const answer = select.value;

      if (col === "0" && answer !== correctAnswers[row].fruit) {
        allCorrect = false;
      }
      if (col === "1" && answer !== correctAnswers[row].color) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setResult("All answers are correct!");
    } else {
      setResult("Some answers are incorrect. Try again!");
    }
  };

  return (
    <div className="game-container">
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Fruit</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice</td>
            <td>
              <select className="answer" data-row="0" data-col="0">
                <option value="">--Select--</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
              </select>
            </td>
            <td>
              <select className="answer" data-row="0" data-col="1">
                <option value="">--Select--</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Bob</td>
            <td>
              <select className="answer" data-row="1" data-col="0">
                <option value="">--Select--</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
              </select>
            </td>
            <td>
              <select className="answer" data-row="1" data-col="1">
                <option value="">--Select--</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Charlie</td>
            <td>
              <select className="answer" data-row="2" data-col="0">
                <option value="">--Select--</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
              </select>
            </td>
            <td>
              <select className="answer" data-row="2" data-col="1">
                <option value="">--Select--</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={checkAnswers}>Check Answers</button>
      <div className="result">{result}</div>
    </div>
  );
};

export default GameTable;
