var oTurn = true;
var numTurns = 0;

const tilesEqual = tileNums => {
  var prev = -1;
  for (var i = 0; i < tileNums.length; i++) {
    if (i == 0) {
      prev = $("#t" + tileNums[i])[0].innerText;
      if (prev == "") {
        return false;
      }
    } else {
      if ($("#t" + tileNums[i])[0].innerText !== prev) {
        return false;
      }
    }
  }
  return true;
};

const checkWin = () => {
  var tiles = new Array();
  for (var i = 0; i < 9; i++) {
    tiles += $("#t" + i)[0].innerText;
  }
  if (tilesEqual([0, 1, 2])) {
    return true;
  }
  if (tilesEqual([3, 4, 5])) {
    return true;
  }
  if (tilesEqual([6, 7, 8])) {
    return true;
  }
  if (tilesEqual([0, 3, 6])) {
    return true;
  }
  if (tilesEqual([1, 4, 7])) {
    return true;
  }
  if (tilesEqual([2, 5, 8])) {
    return true;
  }
  if (tilesEqual([0, 4, 8])) {
    return true;
  }
  if (tilesEqual([6, 4, 2])) {
    return true;
  }
  return false;
};

const changeTurn = turn => {
  $("#turnContainer")
    .empty()
    .append("It's " + turn + " turn!");
};

const disableTile = (targetId, turn) => {
  $("#" + targetId)
    .addClass("grid-item-disabled-" + turn)
    .removeClass("grid-item");
};

const executeHit = targetId => {
  $("#" + targetId)
    .unbind("click")
    .append(oTurn ? "o" : "x");

  if (oTurn) {
    disableTile(targetId, "o");
    if (checkWin()) {
      $(".grid-container").empty();
      $("#resultContainer").append("\nO has won.");
      beginTTT();
      return;
    }
    checkWin();
    changeTurn("X's");
  } else {
    disableTile(targetId, "x");
    if (checkWin()) {
      $(".grid-container").empty();
      $("#resultContainer").append("\nX has won.");
      beginTTT();
      return;
    }
    changeTurn("O's");
  }
  oTurn = oTurn ? false : true;
};

const logicTTT = event => {
  executeHit(event.target.id);
};

const beginTTT = () => {
  $("#turnContainer")
    .empty()
    .append("It's O's turn");

  for (var i = 0; i < 9; i++) {
    $(".grid-container").append(
      '<div id="t' + i + '" class="grid-item noselect"><p></p></div>'
    );
    $("#t" + i).click(logicTTT);
  }
};

beginTTT();
