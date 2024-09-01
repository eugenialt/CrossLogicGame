import React, { useState } from "react";

// Заголовки имен, направлений и времени
const names = ["Макс", "Наташа", "Настя", "Алексей", "Дмитрий"];
const directions = ["рабочка", "глава", "тимбилд", "консультация", "стратегия"];
const times = ["утро", "день", "ночь"];

// Правильные ответы
const correctAnswers = [
  ["check", "cross", "cross", "cross", "cross", "check", "cross", "cross", "cross"],
  ["cross", "check", "cross", "cross", "cross", "cross", "check", "cross", "cross"],
  ["cross", "cross", "check", "cross", "cross", "cross", "cross", "cross", "check"],
  ["cross", "cross", "cross", "cross", "cross", "cross", "cross", "cross", "cross"],
  ["cross", "cross", "cross", "cross", "cross", "cross", "cross", "cross", "cross"]
];

const CrossLogicGame = () => {
  const [grid, setGrid] = useState(
    Array(names.length)
      .fill(null)
      .map(() =>
        Array(directions.length + times.length)
          .fill(null)
          .map(() => null)
      )
  );
  const [feedback, setFeedback] = useState(""); // Для отображения результатов проверки

  // Обработчик для кликов на ячейки
  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];

    // Если текущая ячейка пустая, ставим галочку
    if (newGrid[rowIndex][colIndex] === null) {
      newGrid[rowIndex][colIndex] = "check";
      addHints(rowIndex, colIndex, newGrid); // Добавление подсказок
    } else if (newGrid[rowIndex][colIndex] === "check") {
      // Если уже стоит галочка, ставим крестик
      newGrid[rowIndex][colIndex] = "cross";
    } else {
      // Если стоит крестик, делаем ячейку пустой
      newGrid[rowIndex][colIndex] = null;
    }

    setGrid(newGrid);
  };

  // Добавление подсказок (серые крестики) вокруг галочек
  const addHints = (rowIndex, colIndex, newGrid) => {
    const directions = [
      [0, 1], // Вправо
      [0, -1], // Влево
      [1, 0], // Вниз
      [-1, 0], // Вверх
    ];

    directions.forEach(([rowOffset, colOffset]) => {
      const newRow = rowIndex + rowOffset;
      const newCol = colIndex + colOffset;

      if (
        newRow >= 0 &&
        newRow < names.length &&
        newCol >= 0 &&
        newCol < directions.length + times.length &&
        newGrid[newRow][newCol] === null
      ) {
        newGrid[newRow][newCol] = "hint";
      }
    });
  };

  // Заполнение пустых ячеек крестиками
  const fillEmptyCellsWithCrosses = (newGrid) => {
    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < directions.length + times.length; j++) {
        if (newGrid[i][j] === null) {
          newGrid[i][j] = "cross";
        }
      }
    }
  };

  // Проверка правильности заполнения
  const checkGame = () => {
    const newGrid = [...grid];
    fillEmptyCellsWithCrosses(newGrid); // Заполняем пустые ячейки крестиками

    let isCorrect = true;
    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < directions.length + times.length; j++) {
        if (newGrid[i][j] !== correctAnswers[i][j]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }
    setFeedback(isCorrect ? "Правильно!" : "Неправильно, попробуйте еще раз.");
  };

  return (
    <div className="cross-logic-game">
      <table>
        <thead>
          <tr>
            <th></th>
            {/* Заголовки направлений */}
            {directions.map((direction, index) => (
              <th key={index}>{direction}</th>
            ))}
            {/* Заголовки времени */}
            {times.map((time, index) => (
              <th key={index}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name, rowIndex) => (
            <tr key={rowIndex}>
              <th>{name}</th> {/* Заголовок с именем */}
              {grid[rowIndex].map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className="cell"
                  style={{
                    backgroundColor:
                      cell === "hint" ? "#e0e0e0" : "", // Цвет для подсказок
                    color: cell === "hint" ? "gray" : "black",
                  }}
                >
                  {cell === "check" && "✔️"}
                  {cell === "cross" && "❌"}
                  {cell === "hint" && "❌"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Кнопка "Проверить" */}
      <button onClick={checkGame}>Проверить</button>
      {/* Отображение результата проверки */}
      <div className="feedback">{feedback}</div>
    </div>
  );
};

export default CrossLogicGame;
