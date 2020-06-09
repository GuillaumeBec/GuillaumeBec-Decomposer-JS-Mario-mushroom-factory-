var app = {
  init: function () {
    console.log("init");

    // TODO

    app.drawBoard();
    app.moveForward();
    // Event listeners - TODO
  },
  drawBoard: function () {
    let container = document.querySelector("#board");

    //console.log(container);

    //! 1) on dessine le tableau
    for (let i = 0; i < 4; i++) {
      let cellRow = document.createElement("div");
      cellRow.classList.add("cellRow");
      cellRow.id = "row" + (i + 1);
      container.appendChild(cellRow);
      for (let j = 0; j <= 5; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cellRow.appendChild(cell);
        //console.log(cell);
      }
    }

    //! 2) On dessine les cases départ et arrivée
    let cells = document.querySelectorAll(".cell");
    let startCell = cells[0];
    startCell.classList.add("cellStart");
    //! 3) le curseur commence ici
    startCell.classList.add("cellCurrent");
    //console.log(cells.length);
    let endCell = cells[cells.length - 1];
    endCell.classList.add("cellEnd");
  },

  moveForward: function () {
    //! 1) Collectionnons les cellules dans une tableau pour pouvoir naviguer de l'une à l'autre
    let currentCell = document.querySelector(".cellCurrent");
    let cells = document.querySelectorAll(".cell");

    let rankedCell = [];

    for (let cell in cells) {
      rankedCell.push(cell);
    }

    //! 2) Par défaut, le curseur à la class -right dans la cellule de départ
    currentCell.classList.add("cellCurrent-right");
    console.log(currentCell);
    console.log(currentCell.classList.contains("cellCurrent"));
    console.log(currentCell.classList);

    if (currentCell.classList.contains("cellCurrent-top")) {
      console.log("on est au top");
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      console.log("la tête en bas");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      console.log("virage à gauche");
    } else if (currentCell.classList.contains("cellCurrent-right")) {
      console.log("virage à droite");
    }
  },

  handleLaunchScriptButton: function () {
    // TODO

    // TODO : get all lines as an array

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function () {
    // TODO display if the game is won or not
  },
};

document.addEventListener("DOMContentLoaded", app.init);
