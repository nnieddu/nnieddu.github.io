"use strict";

var playerChoise = false;
var playerTurn = 0;
var audio;
var clickShort = new Audio("./medias/ui-clickShort.mp3");
var themeChoosen = 0;

window.onload = (event) => {
  const modal = document.getElementById("modal");
};

const openModal = function (msg) {
  document.getElementById("end-game-msg").innerHTML = msg;
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const closeModal = function () {
  if (document.getElementById("end-game-msg").innerHTML) {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }
};

function cleanBoardColor() {
  if (!themeChoosen) {
    _0_btn.style.backgroundColor = "#4CAF50";
    _1_btn.style.backgroundColor = "#4CAF50";
    _2_btn.style.backgroundColor = "#4CAF50";
    _3_btn.style.backgroundColor = "#4CAF50";
    _4_btn.style.backgroundColor = "#4CAF50";
    _5_btn.style.backgroundColor = "#4CAF50";
    _6_btn.style.backgroundColor = "#4CAF50";
    _7_btn.style.backgroundColor = "#4CAF50";
    _8_btn.style.backgroundColor = "#4CAF50";
  } else {
    _0_btn.style.backgroundColor = "#317AC1";
    _1_btn.style.backgroundColor = "#317AC1";
    _2_btn.style.backgroundColor = "#317AC1";
    _3_btn.style.backgroundColor = "#317AC1";
    _4_btn.style.backgroundColor = "#317AC1";
    _5_btn.style.backgroundColor = "#317AC1";
    _6_btn.style.backgroundColor = "#317AC1";
    _7_btn.style.backgroundColor = "#317AC1";
    _8_btn.style.backgroundColor = "#317AC1";
  }
}

function cleanBoard(endOfGame) {
  _0_btn.innerHTML = "&nbsp;&nbsp;";
  _1_btn.innerHTML = "&nbsp;&nbsp;";
  _2_btn.innerHTML = "&nbsp;&nbsp;";
  _3_btn.innerHTML = "&nbsp;&nbsp;";
  _4_btn.innerHTML = "&nbsp;&nbsp;";
  _5_btn.innerHTML = "&nbsp;&nbsp;";
  _6_btn.innerHTML = "&nbsp;&nbsp;";
  _7_btn.innerHTML = "&nbsp;&nbsp;";
  _8_btn.innerHTML = "&nbsp;&nbsp;";
  cleanBoardColor();
  if (endOfGame) closeModal();
}

function checkWin(playerChoise) {
  //verticales
  if (
    _0_btn.innerHTML == playerChoise &&
    _1_btn.innerHTML == playerChoise &&
    _2_btn.innerHTML == playerChoise
  ) {
    _0_btn.style.backgroundColor = "#9ACD32";
    _1_btn.style.backgroundColor = "#9ACD32";
    _2_btn.style.backgroundColor = "#9ACD32";
    return true;
  }

  if (
    _3_btn.innerHTML == playerChoise &&
    _4_btn.innerHTML == playerChoise &&
    _5_btn.innerHTML == playerChoise
  ) {
    _3_btn.style.backgroundColor = "#9ACD32";
    _4_btn.style.backgroundColor = "#9ACD32";
    _5_btn.style.backgroundColor = "#9ACD32";
    return true;
  }

  if (
    _6_btn.innerHTML == playerChoise &&
    _7_btn.innerHTML == playerChoise &&
    _8_btn.innerHTML == playerChoise
  ) {
    _6_btn.style.backgroundColor = "#9ACD32";
    _7_btn.style.backgroundColor = "#9ACD32";
    _8_btn.style.backgroundColor = "#9ACD32";
    return true;
  }
  //horizontales
  if (
    _0_btn.innerHTML == playerChoise &&
    _3_btn.innerHTML == playerChoise &&
    _6_btn.innerHTML == playerChoise
  ) {
    _0_btn.style.backgroundColor = "#9ACD32";
    _3_btn.style.backgroundColor = "#9ACD32";
    _6_btn.style.backgroundColor = "#9ACD32";
    return true;
  }

  if (
    _1_btn.innerHTML == playerChoise &&
    _4_btn.innerHTML == playerChoise &&
    _7_btn.innerHTML == playerChoise
  ) {
    _1_btn.style.backgroundColor = "#9ACD32";
    _4_btn.style.backgroundColor = "#9ACD32";
    _7_btn.style.backgroundColor = "#9ACD32";
    return true;
  }

  if (
    _2_btn.innerHTML == playerChoise &&
    _5_btn.innerHTML == playerChoise &&
    _8_btn.innerHTML == playerChoise
  ) {
    _2_btn.style.backgroundColor = "#9ACD32";
    _5_btn.style.backgroundColor = "#9ACD32";
    _8_btn.style.backgroundColor = "#9ACD32";
    return true;
  }
  //diagonales
  if (
    _0_btn.innerHTML == playerChoise &&
    _4_btn.innerHTML == playerChoise &&
    _8_btn.innerHTML == playerChoise
  ) {
    _0_btn.style.backgroundColor = "#9ACD32";
    _4_btn.style.backgroundColor = "#9ACD32";
    _8_btn.style.backgroundColor = "#9ACD32";
    return true;
  }

  if (
    _2_btn.innerHTML == playerChoise &&
    _4_btn.innerHTML == playerChoise &&
    _6_btn.innerHTML == playerChoise
  ) {
    _2_btn.style.backgroundColor = "#9ACD32";
    _4_btn.style.backgroundColor = "#9ACD32";
    _6_btn.style.backgroundColor = "#9ACD32";
    return true;
  }
}

function iaMove(playerChoise) {
  var ia = " ";
  if (playerChoise) ia = "X";
  else ia = "O";

  let timeoutNbr = 0;
  while (timeoutNbr < 250) {
    let x = Math.floor(Math.random() * 9);
    var btn = "_" + x + "_btn";
    timeoutNbr++;
    if (
      document.getElementById(btn).innerText === "X" ||
      document.getElementById(btn).innerText === "O"
    )
      continue;
    else {
      document.getElementById(btn).innerText = ia;
      break;
    }
  }
}

const OnEvent = (doc) => {
  return {
    on: (type, selector, callback) => {
      doc.addEventListener(
        type,
        (event) => {
          if (!event.target.matches(selector)) return;
          callback.call(event.target, event);
        },
        false
      );
    },
  };
};

OnEvent(document).on("click", ".game-btn", function (e) {
  var aiPlayer;
  var player;
  var isFinish = 0;
  var maxMoove = 5;

  if (e.target.innerText == "X" || e.target.innerText == "O") return;
  clickShort.play();
  if (!playerChoise) {
    player = "X";
    aiPlayer = "O";
  } else {
    player = "O";
    aiPlayer = "X";
  }
  if (playerTurn < maxMoove) {
    document.getElementById(e.target.id).innerText = player;
    playerTurn++;
    if (checkWin(player)) {
      isFinish = 1;
      audio = new Audio("./medias/victory.mp3");
      audio.play();
      openModal("Bravo ! C'est gagné :)");
      var delayInMilliseconds = 2500;
      setTimeout(function () {
        cleanBoard(true);
        playerTurn = 0;
      }, delayInMilliseconds);
      return;
    }
    iaMove(playerChoise);
    if (checkWin(aiPlayer)) {
      isFinish = 1;
      audio = new Audio("./medias/loose-arcade.mp3");
      audio.play();
      openModal("Aie ! C'est perdu..");
      var delayInMilliseconds = 2500;
      setTimeout(function () {
        cleanBoard(true);
        playerTurn = 0;
      }, delayInMilliseconds);
      return;
    }
    if (playerTurn == 5) {
      isFinish = 1;
      audio = new Audio("/medias/hit.mp3");
      audio.play();
      openModal("Egalité !");
      var delayInMilliseconds = 2500;
      setTimeout(function () {
        cleanBoard(true);
        playerTurn = 0;
      }, delayInMilliseconds);
      return;
    }
  }
});

OnEvent(document).on("click", "#theme-change-btn", function (e) {
  if (!themeChoosen) {
    document.documentElement.style.setProperty("--button-color", "#317AC1");
    document.documentElement.style.setProperty("--button-color-hover", "#398bdd");

    document.documentElement.style.setProperty("--main-bg-color", "#D4D3DC");
    document.documentElement.style.setProperty("--main-police", "#384454");

    document.documentElement.style.setProperty("--modal-bg-color", "#384454");
    document.documentElement.style.setProperty("--modal-police-color", "#D4D3DC");
    document.documentElement.style.setProperty("--close-modal-button", "#D4D3DC");

    themeChoosen = 1;
    cleanBoardColor();
    return;
  }
  document.documentElement.style.setProperty("--button-color", "#4caf50");
  document.documentElement.style.setProperty("--button-color-hover", "#3e8e41");

  document.documentElement.style.setProperty("--main-bg-color", "#111111");
  document.documentElement.style.setProperty("--main-police", "#f8f8f8");

  document.documentElement.style.setProperty("--modal-bg-color", "#f8f8f8");
  document.documentElement.style.setProperty("--modal-police-color", "#111111");
  document.documentElement.style.setProperty("--close-modal-button", "#333");
  themeChoosen = 0;
  cleanBoardColor();
});

OnEvent(document).on("click", "#crossButton", function (e) {
  playerChoise = false;
});
OnEvent(document).on("click", "#circleButton", function (e) {
  playerChoise = true;
});

OnEvent(document).on("click", ".choice-btn", function (e) {
  if (e.target.innerText == "Reset") {
    cleanBoard(false);
    playerTurn = 0;
    return;
  }
  if (e.target.innerText == "Change team") {
    document.getElementById("gameGrid").style.visibility = "hidden";
    resetButton.style.visibility = "hidden";
    changeButton.style.visibility = "hidden";
    document.getElementById("infos-display").style.visibility = "visible";
    document.getElementById("infos-display").style.position = "unset";
    cleanBoard(false);
    return;
  }
  document.getElementById("gameGrid").style.visibility = "visible";
  resetButton.style.visibility = "visible";
  changeButton.style.visibility = "visible";
  document.getElementById("infos-display").style.visibility = "hidden";
  document.getElementById("infos-display").style.position = "absolute";
});
