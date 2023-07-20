// DOM Access and Global Variable Assignment for func declarations
const ele = document.querySelector(":root");
const redColor = getComputedStyle(ele).getPropertyValue("--red");
const greenColor = getComputedStyle(ele).getPropertyValue("--green");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Data Structure and objects
// Placeholders until make player factoriy and modules

const Player = (id, mark) => {
	this.id = id;
	this.mark = mark;

	return { id, mark };
};

// Game control methods and main logic
const boardControl = (() => {
	const boardStatus = ["", "", "", "", "", "", "", "", ""];

	const update = (board) => {
		for (let i = 1; i <= board.length; i++) {
			let field = document.body.querySelector(
				`.play-square[data-index="${i}"]`
			);
			field.innerHTML = board[i - 1];
		}
	};

	const clear = () => {
		for (let i = 0; i < boardStatus.length; i++) {
			boardStatus[i] = "";
		}
		update(boardStatus);
	};

	function placeMarker(e) {
		const square = e.target.dataset.index;
		const marker = gameControl.getPlayerMark();
		boardStatus[square - 1] = marker;
		update(boardStatus);
		gameControl.nextRound();
	}

	return { clear, update, placeMarker };
})();

const gameControl = (() => {
	// Initialize player vars
	let player1 = Player(1, '<i class="bx bx-x"></i>');
	let player2 = Player(2, '<i class="bx bx-radio-circle"></i>');
	const gameOn = true;
	let round = 0;
	const squares = document.querySelectorAll(".play-square");
	squares.forEach((square) =>
		addEventListener("click", boardControl.placeMarker)
	);

	function newGame(e) {
		// Swap player vars based on selection optioins

		if (e.target.classList[1] === "bx-radio-circle") {
			player1 = Player(1, '<i class="bx bx-radio-circle"></i>');
			player2 = Player(2, '<i class="bx bx-x"></i>');
		}
		displayControl.closeModal();
		boardControl.clear();
		nextRound(round);
	}

	function getPlayerMark() {
		return round % 2 === 0 ? player2.mark : player1.mark;
	}

	function getPlayerId() {
		return round % 2 === 0 ? player2.id : player1.id;
	}

	function nextRound() {
		round++;
		displayControl.updatePrompt(getPlayerId(), getPlayerMark());
	}

	return { newGame, getPlayerMark, getPlayerId, nextRound };
})();

// Display UI and event listeners
const displayControl = (() => {
	//UI items
	const replayBtn = document.getElementById("replay");
	const btnMarkX = document.getElementById("btn-markX");
	const btnMarkO = document.getElementById("btn-markO");
	const replayModal = document.getElementById("replay-modal");
	const overlay = document.querySelector(".overlay");

	const updatePrompt = (id, mark) => {
		const prompt = document.getElementById("prompt");
		prompt.innerHTML = `Player ${id}'s turn.<br />Place an <span>${mark}</span>`;
	};

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
	return { closeModal, updatePrompt };
})();
