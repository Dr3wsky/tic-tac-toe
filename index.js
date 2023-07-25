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
		for (let i = 0; i < board.length; i++) {
			let field = document.body.querySelector(
				`.play-square[data-index="${i}"]`
			);
			field.innerHTML = board[i];
		}
	};

	const checkEmpty = () => {
		return boardStatus.join("") === "";
	};

	const clear = () => {
		for (let i = 0; i < boardStatus.length; i++) {
			boardStatus[i] = "";
		}
		update(boardStatus);
	};

	const placeMarker = (index, marker) => {
		boardStatus[index] = marker;
		update(boardStatus);
	};

	const getSquareIndex = (index) => {
		if (index > boardStatus.length) return;
		return boardStatus[index];
	};

	return { clear, placeMarker, getSquareIndex, checkEmpty };
})();

const gameControl = (() => {
	// Initialize player vars
	let player1;
	let player2;
	let gameOn;
	let round;
	function newGame(e) {
		// Swap player vars based on selection optioins

		if (e.target.classList[1] === "bx-radio-circle") {
			player1 = Player(1, '<i class="bx bx-radio-circle"></i>');
			player2 = Player(2, '<i class="bx bx-x"></i>');
		} else {
			player1 = Player(1, '<i class="bx bx-x"></i>');
			player2 = Player(2, '<i class="bx bx-radio-circle"></i>');
		}
		displayControl.closeModal();
		boardControl.clear();
		round = 1;
		gameOn = true;
		displayControl.updatePrompt(getPlayerId(), getPlayerMark());
	}

	function checkWin(squareIndex) {
		// Assigns arrays to check if squares full to satisfy game over
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		// Filters to check if any of winConditions are satisfied by current marker
		return winConditions
			.filter((combination) => combination.includes(squareIndex))
			.some((possibleCombination) =>
				possibleCombination.every(
					(index) => boardControl.getSquareIndex(index) === getPlayerMark()
				)
			);
	}

	function getPlayerMark() {
		return round % 2 === 0 ? player2.mark : player1.mark;
	}

	function getPlayerId() {
		return round % 2 === 0 ? player2.id : player1.id;
	}

	function playRound(e) {
		if (!gameOn) {
			newGame(e);
			const squareIndex = parseInt(e.target.dataset.index);
			boardControl.placeMarker(squareIndex, getPlayerMark());
			round++;
			displayControl.updatePrompt(getPlayerId(), getPlayerMark());
		} else if (gameOn && e.target.classList[0] !== "bx") {
			const squareIndex = parseInt(e.target.dataset.index);
			boardControl.placeMarker(squareIndex, getPlayerMark());
			checkWin();
			round++;
			displayControl.updatePrompt(getPlayerId(), getPlayerMark());
		}
	}

	const squares = document.querySelectorAll(".play-square");
	squares.forEach((square) => addEventListener("click", playRound));

	return { newGame, getPlayerMark, checkWin };
})();

// Display UI and event listeners
const displayControl = (() => {
	//UI items
	const replayBtn = document.getElementById("replay");
	const btnMarkX = document.getElementById("btn-markX");
	const btnMarkO = document.getElementById("btn-markO");
	const replayModal = document.getElementById("replay-modal");
	const overlay = document.querySelector(".overlay");

	function updatePrompt(id, mark) {
		const prompt = document.getElementById("prompt");
		prompt.innerHTML = `Player ${id}'s turn.<br />Place an <span>${mark}</span>`;
	}

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
