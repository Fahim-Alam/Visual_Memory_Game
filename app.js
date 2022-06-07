/** @format */

const gameContainer = document.querySelector("section");
const columns = document.getElementsByClassName("column");
const button = document.querySelector("button");
const levelDisplay = document.querySelector(".level-display");
const scoreDisplay = document.querySelector(".score-display");
const color = "rgb(32, 88, 32)";
let score = 0;
let time = 2000;

Array.prototype.forEach.call(columns, (column, i) => {
  setUpGrid();
});

function multiDimensionalUnique(arr) {
  const uniques = [];
  const itemsFound = {};
  for (let i = 0; i < arr.length; i++) {
    const stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) {
      continue;
    }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

function setUpGrid() {
  for (let i = 0; i < columns.length; i++) {
    const box = document.createElement("div");
    columns[i].appendChild(box);
    for (let j = 0; j < columns[i].childNodes.length; j++) {
      box.className = `${i} ${j}`;
      columns[i].childNodes[j].className = `${i} ${j}`;
    }
  }
}

if (button.childNodes[5].textContent === "Start") {
  button.addEventListener("click", () => {
    setUpGame();
    button.style.display = "none";
  });
}

function setUpGame() {
  let correctSquares = [];
  let selectedCorrectSquares = [];
  if (columns.length === 7) {
    while (multiDimensionalUnique(correctSquares).length < columns.length + 5) {
      for (let i = 0; i < columns.length; i++) {
        const column = Math.floor(Math.random() * columns.length);
        const square = Math.floor(Math.random() * columns.length);
        correctSquares.push([column, square]);
        columns[column].childNodes[square].style.backgroundColor = color;
        columns[column].childNodes[square].className += " correct";
      }
    }
  } else if (columns.length === 8) {
    time = 3250;
    while (multiDimensionalUnique(correctSquares).length < columns.length + 7) {
      for (let i = 0; i < columns.length; i++) {
        const column = Math.floor(Math.random() * columns.length);
        const square = Math.floor(Math.random() * columns.length);
        correctSquares.push([column, square]);
        columns[column].childNodes[square].style.backgroundColor = color;
        columns[column].childNodes[square].className += " correct";
      }
    }
  } else if (columns.length < 7) {
    while (multiDimensionalUnique(correctSquares).length < columns.length + 2) {
      for (let i = 0; i < columns.length; i++) {
        const column = Math.floor(Math.random() * columns.length);
        const square = Math.floor(Math.random() * columns.length);
        correctSquares.push([column, square]);
        columns[column].childNodes[square].style.backgroundColor = color;
        columns[column].childNodes[square].className += " correct";
      }
    }
  }
  setTimeout(startLevel, time);

  setTimeout(() => {
    Array.prototype.forEach.call(columns, (column, i) => {
      column.addEventListener("click", (e) => {
        const squareCoordinate = [
          e.target.className.split(" ")[0],
          e.target.className.split(" ")[1],
        ].map((c) => parseInt(c));
        if (e.target.className !== "column") {
          if (e.target.className.includes("correct")) {
            selectedCorrectSquares.push(squareCoordinate);
            e.target.style.backgroundColor = color;
          } else {
            e.target.style.backgroundColor = "rgb(224, 26, 26)";
            gameContainer.style.animation = "shake 0.5s";

            setTimeout(() => {
              e.target.style.backgroundColor = "initial";
              gameContainer.style.animation = "none";
            }, 400);
          }
          if (
            JSON.stringify(
              multiDimensionalUnique(selectedCorrectSquares).sort()
            ) ===
              JSON.stringify(multiDimensionalUnique(correctSquares).sort()) &&
            columns.length === 8
          ) {
            score += (columns.length + 2) * 2;
            levelDisplay.textContent = "Congratulations, you beat the game!";
          } else if (
            JSON.stringify(
              multiDimensionalUnique(selectedCorrectSquares).sort()
            ) === JSON.stringify(multiDimensionalUnique(correctSquares).sort())
          ) {
            score += (columns.length + 2) * 2;
            levelDisplay.textContent = "Level Complete";
            scoreDisplay.textContent = `Score: ${score}`;
            time += 100;
            selectedCorrectSquares = [];
            setTimeout(() => {
              const newColumn = document.createElement("div");
              newColumn.className = "column";
              for (let i = 0; i < columns.length; i++) {
                const box = document.createElement("div");
                newColumn.appendChild(box);
                for (let j = 0; j < columns[i].childNodes.length; j++) {
                  box.className = `${i} ${j}`;
                }
              }
              gameContainer.appendChild(newColumn);
              setUpGrid();
              startLevel();
              setUpGame();
              selectedCorrectSquares = [];
            }, 1500);
          }
        }
      });
    });
  }, 2000);
}

function startLevel() {
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columns[i].childNodes.length; j++) {
      columns[i].childNodes[j].style.backgroundColor = "initial";
    }
  }
  levelDisplay.textContent = `Level ${columns.length - 2}`;
}
