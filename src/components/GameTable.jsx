import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Заголовки имен, направлений и времени
const names = ["Макс", "Наташа", "Настя", "Таня"];
const directions = ["Рабочка", "Тимбилд", "Глава", "Мерч"];
const times = ["Биофак", "ФМО", "ФПМИ", "Юрфак"];

// Правильные ответы
/*
Наташа не с ФПМИ и не с ФМО
Глава тимбилда - это не Таня, а ещё он/она не с биофака
Глава с юрфака, и это не Настя
Макс - рабочка, и он с ФПМИ
*/

const hints = [
  "Наташа не с ФПМИ и не с ФМО",
  "Глава тимбилда - это не Таня, а ещё он/она не с биофака",
  "Глава с юрфака, и это не Настя",
  "Макс - рабочка, и он с ФПМИ",
];

const correctAnswersCrosses = [
  ["check", "cross", "cross", "cross", "cross", "cross", "check", "cross"],
  ["cross", "cross", "check", "cross", "cross", "cross", "cross", "check"],
  ["cross", "check", "cross", "cross", "cross", "check", "cross", "cross"],
  ["cross", "cross", "cross", "check", "check", "cross", "cross", "cross"],
];
const correctAnswersHints = [
  ["check", "hint", "hint", "hint", "hint", "hint", "check", "hint"],
  ["hint", "hint", "check", "hint", "hint", "hint", "hint", "check"],
  ["hint", "check", "hint", "hint", "hint", "check", "hint", "hint"],
  ["hint", "hint", "hint", "check", "check", "hint", "hint", "hint"],
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
  const navigate = useNavigate();
  const [gameCompleted, setGameCompleted] = useState(false);

  // Обработчик для кликов на ячейки
  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];

    // Если текущая ячейка пустая, ставим галочку
    if (newGrid[rowIndex][colIndex] === null) {
      newGrid[rowIndex][colIndex] = "check";
      addHints(rowIndex, colIndex, newGrid); // Добавление подсказок
    } else if (newGrid[rowIndex][colIndex] === "check") {
      // Если уже стоит галочка, ставим крестик
      newGrid[rowIndex][colIndex] = "hint";
      removeHints(rowIndex, colIndex, newGrid);
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

    // Функция для определения группы столбца (времени или направлений)
    const getColumnGroup = (colIndex) => {
      if (colIndex < directions.length) {
        return "directions";
      } else {
        return "times";
      }
    };

    const columnGroup = getColumnGroup(colIndex);

    directions.forEach(([rowOffset, colOffset]) => {
      let newRow = rowIndex + rowOffset;
      let newCol = colIndex + colOffset;

      while (
        newRow >= 0 &&
        newRow < names.length &&
        newCol >= 0 &&
        newCol < directions.length + times.length &&
        getColumnGroup(newCol) === columnGroup // Проверяем, остаемся ли в той же группе столбцов
      ) {
        if (newGrid[newRow][newCol] !== "check" && newGrid[newRow][newCol] !== "hint") {
          newGrid[newRow][newCol] = "cross";
        }

        newRow += rowOffset;
        newCol += colOffset;
      }
    });
  };

  // Удаление подсказок (серых крестиков) в направлении, где стояла галочка
  const removeHints = (rowIndex, colIndex, newGrid) => {
    const directions = [
      [0, 1], // Вправо
      [0, -1], // Влево
      [1, 0], // Вниз
      [-1, 0], // Вверх
    ];

    directions.forEach(([rowOffset, colOffset]) => {
      let newRow = rowIndex + rowOffset;
      let newCol = colIndex + colOffset;

      while (
        newRow >= 0 &&
        newRow < names.length &&
        newCol >= 0 &&
        newCol < directions.length + times.length
      ) {
        // Если находим галочку в направлении удаления, прекращаем удаление крестиков
        if (newGrid[newRow][newCol] === "check") {
          break;
        }

        // Удаляем крестик, только если он не поддерживается другой галочкой
        if (newGrid[newRow][newCol] === "cross") {
          newGrid[newRow][newCol] = null;
        }

        newRow += rowOffset;
        newCol += colOffset;
      }
    });

    // Обновление крестиков после удаления галочки
    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < directions.length + times.length; j++) {
        if (newGrid[i][j] === "check") {
          addHints(i, j, newGrid); // Добавляем крестики заново от оставшихся галочек
        }
      }
    }
  };

  // Проверка правильности заполнения
  const checkGame = () => {
    let isCorrect = true;

    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < directions.length + times.length; j++) {
        if (grid[i][j] !== correctAnswersCrosses[i][j] && grid[i][j] !== correctAnswersHints[i][j]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      setFeedback("Правильно!");
      setGameCompleted(true); // Устанавливаем состояние успешного завершения
    } else {
      setFeedback("Неправильно, попробуйте еще раз");
      setGameCompleted(false); // Сбрасываем состояние
    }
  };

  return (
    <div className="cross-logic-game">
      <div className="hints">
        <div className="hint-text">Подсказки:</div>
        <ul className="hints-wrapper">
          {hints.map((hint, index) => (
            <li className="hint-li" key={index}>
              {hint}
            </li>
          ))}
        </ul>
      </div>
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
              <th>{name}</th>

              {/* Заголовок с именем */}
              {grid[rowIndex].map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className="cell"
                  style={{
                    backgroundColor: cell === "hint" ? "#e0e0e0" : "", // Цвет для подсказок
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
      {gameCompleted && (
        <button
          className="next-level-button"
          onClick={() => navigate("/leveltwo")}
        >
          Перейти на второй уровень
        </button>
      )}
    </div>
  );
};

export default CrossLogicGame;
