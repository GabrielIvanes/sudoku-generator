function init(sudoku) {
  for (let i = 0; i < sudoku.length; i++) {
    sudoku[i] = "0";
  }
}

function isInSquare(value, squareCoordinate, sudoku) {
  for (
    let i = squareCoordinate[0] * 9 + squareCoordinate[1];
    i <= squareCoordinate[0] * 9 + squareCoordinate[1] + 18;
    i += 9
  ) {
    for (let j = i; j < i + 3; j++) {
      if (sudoku[j] === value) {
        return true;
      }
    }
  }

  return false;
}

function isInRow(value, nbRow, sudoku) {
  for (let i = nbRow * 9; i < 9 * (nbRow + 1); i++) {
    if (sudoku[i] === value) {
      return true;
    }
  }
  return false;
}

function isInCol(value, nbCol, sudoku) {
  for (let i = nbCol; i <= 9 * 8 + nbCol; i += 9) {
    if (sudoku[i] === value) {
      return true;
    }
  }
  return false;
}

function isCompleted(sudoku) {
  for (let i = 0; i < sudoku.length; i++) {
    if (sudoku[i] === "0") {
      return false;
    }
  }
  return true;
}

function square(value) {
  let numRow = Math.floor(value / 9);
  let numCol = value % 9;

  let numSquareRow = Math.floor(numRow / 3) * 3;
  let numSquareCol = Math.floor(numCol / 3) * 3;

  let squareCoordinate = new Array(2);

  squareCoordinate[0] = numSquareRow;
  squareCoordinate[1] = numSquareCol;

  return squareCoordinate;
}

function display(sudoku) {
  for (let i = 0; i < sudoku.length; i++) {
    if (sudoku[i] === "0") {
      document.querySelector("#cell" + i).innerHTML = "";
    } else {
      document.querySelector("#cell" + i).innerHTML = sudoku[i];
    }
  }
}

function solveSudoku(sudoku) {
  let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 81; i++) {
    if (sudoku[i] === "0") {
      let numRow = Math.floor(i / 9);
      let numCol = i % 9;
      let squareCoordinate = square(i);

      let random = Math.floor(Math.random() * possibilities.length);
      while (
        isInRow(possibilities[random], numRow, sudoku) ||
        isInSquare(possibilities[random], squareCoordinate, sudoku) ||
        isInCol(possibilities[random], numCol, sudoku)
      ) {
        possibilities.splice(random, 1);
        if (possibilities.length === 0) {
          return;
        }
        random = Math.floor(Math.random() * possibilities.length);
      }
      sudoku[i] = possibilities[random];
      possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  }
}

function isSolvent(sudoku) {
  solveSudoku(sudoku);
  if (isCompleted(sudoku)) {
    return true;
  }
  return false;
}

function createSudoku() {
  var sudoku = new Array(81);
  var copySudoku = new Array(81);
  var testSudoku = new Array(81);
  init(sudoku);
  let complete = false;
  while (!complete) {
    init(sudoku);
    solveSudoku(sudoku);
    if (isCompleted(sudoku)) {
      complete = true;
    }
  }
  display(sudoku);
  copySudoku = sudoku.slice();
  testSudoku = sudoku.slice();
  let nbRemove = "0";
  let removed = 0;
  while (complete && removed < 64) {
    // min for solved a sudoku is 17 digits
    let random = Math.floor(Math.random() * 81);
    if (copySudoku[random] != "0") {
      nbRemove = copySudoku[random];
      testSudoku[random] = "0";
      copySudoku[random] = "0";
      if (!isSolvent(testSudoku)) {
        copySudoku[random] = nbRemove;
        if (removed > 40) {
          complete = false;
        }
      } else {
        removed++;
      }
      testSudoku = copySudoku.slice();
    }
  }
  console.log(removed);
  display(copySudoku);
  document.querySelector(".answer").addEventListener("click", () => {
    display(sudoku);
  });
}

onload = () => {
  createSudoku();
};

document.querySelector(".new-sudoku").addEventListener("click", () => {
  createSudoku();
});
