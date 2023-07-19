// DOM Access and Global Variable Assignment for func declarations
const ele = document.querySelector(":root");
const redColor = getComputedStyle(ele).getPropertyValue("--red");
const greenColor = getComputedStyle(ele).getPropertyValue("--green");
const prompt = document.getElementById("prompt");
const replayBtn = document.getElementById("replay");
const btnMarkX = document.getElementById("btn-markX");
const btnMarkO = document.getElementById("btn-markO");
const squares = document.querySelectorAll(".play-square");

const replayModal = document.getElementById("replay-modal");
const overlay = document.querySelector(".overlay");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data Structure and objects
// Placeholders until make player factoriy and modules

const Player = (id, mark) => {
	this.id = id;
	this.mark = mark;

	return { id, mark };
};

const boardControl = (() => {
	const boardStatus = ["", "", "", "", "", "", "", "", ""];

	const updateBoard = (board) => {
		for (let i = 1; i <= board.length; i++) {
			let field = document.body.querySelector(
				`.play-square[data-index="${i}"]`
			);
			field.innerHTML = board[i];
		}
	};

	const clear = () => {
		for (let i = 0; i < boardStatus.length; i++) {
			boardStatus[i] = "";
		}
		updateBoard(boardStatus);
	};

	return { clear, updateBoard };
})();

// Game control methods and main logic
const gameControl = (() => {
	function newGame(e) {
		if (e.target.classList[1] === "bx-radio-circle") {
			const player1 = Player(1, '<i class="bx bx-radio-circle"></i>');
			const player2 = Player(2, '<i class="bx bx-x"></i>');
			console.log({ player1 }, { player2 });
		} else {
			const player1 = Player(1, '<i class="bx bx-x"></i>');
			const player2 = Player(2, '<i class="bx bx-radio-circle"></i>');
			console.log({ player1 }, { player2 });
		}
		console.log({ player1 }, { player2 });
		boardControl.clear();
		displayControl.closeModal();
	}
	return { newGame };
})();

// Display UI and event listeners
const displayControl = (() => {
	const replay = () => {
		overlay.style.display = "block";
		replayModal.classList.add("active");
	};

	const closeModal = () => {
		overlay.style.display = "none";
		replayModal.classList.remove("active");
	};

	const checkKeyPress = (e) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	// Event Listners for buttons
	replayBtn.onclick = replay;
	overlay.onclick = closeModal;
	window.onkeyup = checkKeyPress;
	btnMarkO.onclick = gameControl.newGame;
	btnMarkX.onclick = gameControl.newGame;
	return { closeModal };
})();
// Event Listeners
// squares.forEach((square) => square.addEventListener("click", play));
