// DOM Access and Global Variable Assignment for func declarations
const ele = document.querySelector(":root");
const redColor = getComputedStyle(ele).getPropertyValue("--red");
const greenColor = getComputedStyle(ele).getPropertyValue("--green");
const prompt = document.getElementById("prompt");
const replayBtn = document.getElementById("replay");
const squares = document.querySelectorAll(".play-square");

const addBookBtn = document.getElementById("add-book-btn");
const submitBtn = document.getElementById("submit-btn");
const replayModal = document.getElementById("replay-modal");
const overlay = document.querySelector(".overlay");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data Structure and objects
// Placeholders until make player factoriy and modules
const player1 = "x";
const player2 = "o";
const markerO = '<i class="bx bx-circle"></i>';
const markerX = '<i class="bx bx-x"></i>';

const marker = markerO;

const Player = (e) => {
  this.mark = me.target.innerHTML;
  const getMark = () => {
    return mark;
  };
  return { getMark };
};

// Initialize gamevoard modules

const gameControl = (() => {
  const replay = () => {
    overlay.style.display = "block";
    replayModal.classList.add("active");
  };

  const undoReplay = () => {
    overlay.style.display = "none";
    replayModal.classList.remove("active");
  };

  return { replay, undoReplay };
})();

// Event Listeners
squares.forEach((square) => square.addEventListener("click", play));
replayBtn.onclick = gameControl.replay;
overlay.onclick = gameControl.undoReplay;

function play(e, marker) {
  const idx = e.target.dataset.index;
  e.target.innerHTML = marker;
}
