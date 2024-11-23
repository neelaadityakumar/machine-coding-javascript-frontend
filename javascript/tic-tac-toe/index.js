const gridElement = document.getElementById("grid");

class TicTacToe {
  constructor(root, gridSize = 3) {
    this.gridSize = gridSize;
    this.root = root;
    this.grid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill("")
    );
    this.currentPlayer = "X";
    this.winner = null;
    this.cellFilled = 0;
    this.init();
  }

  init() {
    this.root.appendChild(this.createGrid());
    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell") && !this.winner) {
        this.play(e.target);
      }
    });
  }

  createGrid() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        fragment.appendChild(cell);
      }
    }
    return fragment;
  }

  play(cell) {
    const x = cell.dataset.x;
    const y = cell.dataset.y;
    if (!this.grid[x][y]) {
      this.grid[x][y] = this.currentPlayer;
      cell.textContent = this.currentPlayer;
      this.cellFilled++;

      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        this.winnerCallback?.(this.winner);
      } else if (this.cellFilled === this.gridSize ** 2) {
        this.winner = "Draw";
        this.winnerCallback?.(this.winner);
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  checkWinner() {
    return this.checkRows() || this.checkCols() || this.checkDiagonals();
  }

  checkRows() {
    for (let row of this.grid) {
      if (row.every((cell) => cell === row[0] && cell !== "")) return row[0];
    }
    return false;
  }

  checkCols() {
    for (let col = 0; col < this.gridSize; col++) {
      if (
        this.grid.every(
          (row) => row[col] === this.grid[0][col] && this.grid[0][col] !== ""
        )
      ) {
        return this.grid[0][col];
      }
    }
    return false;
  }

  checkDiagonals() {
    const mainDiag = this.grid.map((_, i) => this.grid[i][i]);
    const antiDiag = this.grid.map(
      (_, i) => this.grid[i][this.gridSize - 1 - i]
    );

    if (mainDiag.every((cell) => cell === mainDiag[0] && cell !== ""))
      return mainDiag[0];
    if (antiDiag.every((cell) => cell === antiDiag[0] && cell !== ""))
      return antiDiag[0];
    return false;
  }

  reset() {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill("")
    );
    this.currentPlayer = "X";
    this.winner = null;
    this.cellFilled = 0;
    Array.from(this.root.children).forEach((cell) => (cell.textContent = ""));
  }
}

const ticTacToe = new TicTacToe(gridElement);
ticTacToe.winnerCallback = (winner) => {
  switch (winner) {
    case "X":
      document.getElementById("winner").textContent = "Player X won!";
      break;
    case "O":
      document.getElementById("winner").textContent = "Player O won!";
      break;
    default:
      document.getElementById("winner").textContent = "Draw!";
  }
};

document.getElementById("reset").addEventListener("click", () => {
  ticTacToe.reset();
  document.getElementById("winner").textContent = "";
});
