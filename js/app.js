let app = {
  init: function () {
    console.log("init");
    multimedia.init();
    // TODO

    app.drawBoard();

    /*app.moveForward();
    //app.moveForward();

    app.moveForward();

    app.turnRight();

    app.moveForward();


    app.turnLeft();
    app.moveForward();
    app.moveForward();*/

    // Event listeners - TODO
    //!==================================================Gestion des boutons de lancement et de réinitialisation======
    let scriptButton = document.querySelector("#launchScript");
    scriptButton.addEventListener("click", app.handleLaunchScriptButton);

    let resetButton = document.createElement("button");
    resetButton.id = "launchScript";
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", app.resetGameBoard);

    scriptButton.after(resetButton);

    //!================================================================================================================
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

    //! 2) On dessine les cases départ et arrivée, de manière aléatoire
    let cells = document.querySelectorAll(".cell");
    //let startCell = cells[0];
    min = Math.ceil(0);
    max = Math.floor(cells.length);
    let startCell = cells[Math.floor(Math.random() * (max - min - 1)) + min]; //The maximum is inclusive and the minimum is inclusive 
    //console.log(startCell);
    startCell.classList.add("cellStart");
    //! 3) le curseur commence ici
    startCell.classList.add("cellCurrent");
    //! II) 2) Par défaut, le curseur à la class -right dans la cellule de départ
    startCell.classList.add("cellCurrent-right");

    let endCell = cells[Math.floor(Math.random() * (max - min - 1)) + min]; //The maximum is inclusive and the minimum is inclusive 

    do { // On fait en sorte que les deux cases ne se cumulent pas l'une sur l'autre
      let endCell = cells[Math.floor(Math.random() * (max - min - 1)) + min]; //The maximum is inclusive and the minimum is inclusive 
    } while (endCell == startCell);
    //console.log(endCell);
    endCell.classList.add("cellEnd");
  },

  moveForward: function () {
    //! 1) Collectionnons les cellules dans une tableau pour pouvoir naviguer de l'une à l'autre
    let currentCell = document.querySelector(".cellCurrent");
    //console.log(currentCell);
    let cells = document.querySelectorAll(".cell");

    //? Comment atteindre une case précise :
    let rankedCells = Array.from(cells);
    let actualRank = rankedCells.indexOf(currentCell);

    //! 3) On reconnait maintenant le sens de la flèche
    //On va donc pouvoir modifier le rang de la cell ayant la flèche avec la variable actualRank
    // 1) on fait varier l'alctual rank
    // puis on va chercher la cell de ce nouvel index et lui transférer la class
    if (currentCell != undefined) {
      if (currentCell.classList.contains("cellCurrent-top")) {
        if (actualRank < 6) {
          console.log('out');
          let failSquare = document.querySelector("#fails");
          failSquare.textContent += "Sorti du cadre !";
          app.resetGameBoard();
          let board = document.querySelector('#board');
          board.innerHTML = "";
          app.drawBoard();
        } else {
          actualRank -= 6;
          //console.log("ok top");
          currentCell.classList.remove("cellCurrent");
          currentCell = rankedCells[actualRank];
          currentCell.classList.add("cellCurrent-top");
          currentCell.classList.add("cellCurrent");
          //console.log(currentCell);
        }
      } else if (currentCell.classList.contains("cellCurrent-bottom")) {
        if (actualRank > 18) {
          console.log('out');
          let failSquare = document.querySelector("#fails");
          failSquare.textContent += "Sorti du cadre !";
          //currentCell = startCell;
          app.resetGameBoard();
          let board = document.querySelector('#board');
          board.innerHTML = "";
          app.drawBoard();
        } else {
          actualRank += 6;
          //console.log("ok bottom");
          currentCell.classList.remove("cellCurrent");
          currentCell = rankedCells[actualRank];
          currentCell.classList.add("cellCurrent-bottom");
          currentCell.classList.add("cellCurrent");
          //console.log(currentCell);
        }
      } else if (currentCell.classList.contains("cellCurrent-left")) {
        actualRank -= 1;
        //console.log("ok left");
        currentCell.classList.remove("cellCurrent");
        currentCell = rankedCells[actualRank];
        currentCell.classList.add("cellCurrent-left");
        currentCell.classList.add("cellCurrent");
        //console.log(currentCell);
      } else if (currentCell.classList.contains("cellCurrent-right")) {
        //console.log("ok right");
        actualRank += 1;
        currentCell.classList.remove("cellCurrent");
        currentCell = rankedCells[actualRank];
        currentCell.classList.add("cellCurrent-right");
        currentCell.classList.add("cellCurrent");
        //console.log(currentCell);
      }
    } else {
      console.log('out');
      let failSquare = document.querySelector("#fails");
      failSquare.textContent += "Sorti du cadre !";
      app.resetGameBoard();
      app.drawBoard();
    }
    //console.log(actualRank);
    //console.log(currentCell);
  },

  turnRight: function () {
    let currentCell = document.querySelector(".cellCurrent");
    //console.log(currentCell);
    if (currentCell.classList.contains("cellCurrent-right")) {
      currentCell.classList.add("cellCurrent-bottom");
      currentCell.classList.remove("cellCurrent-right");
      //console.log(currentCell);
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      currentCell.classList.add("cellCurrent-left");
      currentCell.classList.remove("cellCurrent-bottom");
    } else if (currentCell.classList.contains("cellCurrent-top")) {
      currentCell.classList.add("cellCurrent-right");
      currentCell.classList.remove("cellCurrent-top");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      currentCell.classList.add("cellCurrent-top");
      currentCell.classList.remove("cellCurrent-left");
    }
  },

  turnLeft: function () {
    let currentCell = document.querySelector(".cellCurrent");
    //console.log(currentCell);
    if (currentCell.classList.contains("cellCurrent-right")) {
      currentCell.classList.add("cellCurrent-top");
      currentCell.classList.remove("cellCurrent-right");
    } else if (currentCell.classList.contains("cellCurrent-bottom")) {
      currentCell.classList.add("cellCurrent-right");
      currentCell.classList.remove("cellCurrent-bottom");
    } else if (currentCell.classList.contains("cellCurrent-top")) {
      currentCell.classList.add("cellCurrent-left");
      currentCell.classList.remove("cellCurrent-top");
    } else if (currentCell.classList.contains("cellCurrent-left")) {
      currentCell.classList.add("cellCurrent-bottom");
      currentCell.classList.remove("cellCurrent-left");
    }
  },

  handleLaunchScriptButton: function () {
    // TODO
    //console.log("lire le script");
    //! On récupère le texcontent de la div dans son attribue value
    let scriptText = document.querySelector("#userCode").value;
    //console.log(scriptText);
    // TODO : get all lines as an array

    let codeLines = [];
    codeLines.push(scriptText.split(/\r?\n/));
    //console.log(codeLines);

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },

  resetGameBoard: function () {
    let scriptText = document.querySelector("#userCode");
    //console.log(scriptText);
    scriptText.value = "";
    let currentCell = document.querySelector(".cellCurrent");
    //console.log(currentCell);
    currentCell.classList.remove("cellCurrent");
    let cells = document.querySelectorAll('.cell');
    for (let index = 0; index < cells.length; index++) {
      //console.log(cells[index]);
      cells[index].classList.remove('cellCurrent-right', 'cellCurrent-bottom', 'cellCurrent-left', 'cellCurrent-top', 'cellCurrent');
    }
    let startCell = document.querySelector(".cellStart");
    startCell.classList.add("cellCurrent");
    startCell.classList.add("cellCurrent-right");
  },

  codeLineLoop: function (codeLines, index) {
    let currentLine = codeLines[index];
    //console.log(currentLine);

    if (currentLine !== undefined) {

      for (index = 0; index < currentLine.length; index++) {

        //console.log(index);
        // Getting currentLine
        // if still a line to interpret

        if (currentLine[index].includes('forward')) {
          console.log('forward');
          app.moveForward();
        } else if (currentLine[index].includes('right')) {
          console.log('right')
          app.turnRight();
        } else if (currentLine[index].includes('left')) {
          console.log('left')
          app.turnLeft();
        }
        // Recall same method (=> make a loop)
        window.setTimeout(function () {
          app.codeLineLoop(codeLines, index);
        }, 1000);
      }
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000)

    }
  },


  checkSuccess: function () {
    // TODO display if the game is won or not

    let endCell = document.querySelector(".cellEnd");
    //console.log(endCell);
    let scoreCount;
    let loseCount;

    if (endCell.classList.contains("cellCurrent")) {
      //console.log("you win");
      app.resetGameBoard();
      let board = document.querySelector('#board');
      board.innerHTML = "";
      app.drawBoard();

      let scoreCount = parseInt((document.querySelector('#score').textContent), 10);
      let score = document.querySelector('#score');
      scoreCount += 1;
      score.textContent = scoreCount;
      notification.play();
      notification.volume(0.6);

    } else {
      console.log("you lose");
      app.resetGameBoard();
      let board = document.querySelector('#board');
      board.innerHTML = "";
      app.drawBoard();
    }

  },
};

document.addEventListener("DOMContentLoaded", app.init);