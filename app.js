// import needed modules
import {
    throws,
    results,
    getRandomThrow,
    scoreRound,
} from '../utils.js';

// constants
const animationDuration = 300;

// state
const state = {
    playerThrow: null,
    computerThrow: null,
    get didWin() {
        return scoreRound(this.playerThrow, this.computerThrow);
    },
    totalRounds: 0,
    wonRounds: 0,
    lostRounds: 0,
    get drawnRounds() {
        return this.totalRounds - this.wonRounds - this.lostRounds;
    },
    get winRate() {
        return this.wonRounds / this.totalRounds;
    },
};

// components

// Game Display Component
const playerThrowImg = document.getElementById('player-throw-image');
const computerThrowImg = document.getElementById('computer-throw-image');
const playerThrowLabel = document.getElementById('player-throw-label');
const computerThrowLabel = document.getElementById('computer-throw-label');
const gameMessage = document.getElementById('game-message');

const imgMap = new Map();
imgMap.set(throws.rock, 'assets/rock.png');
imgMap.set(throws.paper, 'assets/paper.png');
imgMap.set(throws.scissors, 'assets/scissors.png');
imgMap.set(null, 'assets/question.png');            // null and undefined mappings work,
imgMap.set(undefined, 'assets/question.png');       // to my surprise.

const labelMap = new Map();
labelMap.set(throws.rock, 'Rock!');
labelMap.set(throws.paper, 'Paper!');
labelMap.set(throws.scissors, 'Scissors!');
labelMap.set(null, '');
labelMap.set(undefined, '');

function clearTimeout() {
    playerThrowImg.classList.remove('attacking');
    computerThrowImg.classList.remove('attacking-flipped');
}

function displayGame() {
    playerThrowImg.src = imgMap.get(state.playerThrow);
    computerThrowImg.src = imgMap.get(state.computerThrow);

    computerThrowImg.classList.toggle('flipped', state.computerThrow);

    playerThrowLabel.textContent = labelMap.get(state.playerThrow);
    computerThrowLabel.textContent = labelMap.get(state.computerThrow);

    switch (state.didWin) {
        case results.playerWin:
            playerThrowImg.classList.add('attacking');
            gameMessage.textContent = 'You Won!';
            break;
        case results.computerWin:
            computerThrowImg.classList.add('attacking-flipped');
            gameMessage.textContent = 'You Lost!';
            break;
        case results.draw:
            gameMessage.textContent = 'A Draw!';
            break;
        default:
            gameMessage.textContent = 'Make a Throw!';
            break;
    }

    setTimeout(clearTimeout, animationDuration);
}

// Throw Selection Component
const rockButton = document.getElementById('rock-button');
const paperButton = document.getElementById('paper-button');
const scissorsButton = document.getElementById('scissors-button');

function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}

function enableButtons() {
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
}

function handleButtonPress(playerThrow) {
    state.playerThrow = playerThrow;
    state.computerThrow = getRandomThrow();

    state.totalRounds++;
    const roundResult = state.didWin;
    if (roundResult === results.playerWin) {
        state.wonRounds++;
    }
    else if (roundResult === results.computerWin) {
        state.lostRounds++;
    }

    disableButtons();
    // The small buffer is to make sure the animation class is actually cleared.
    setTimeout(enableButtons, animationDuration + 20);

    displayGame();
    displayScoreboard();
}

rockButton.addEventListener('click', () => {
    handleButtonPress(throws.rock);
});

paperButton.addEventListener('click', () => {
    handleButtonPress(throws.paper);
});

scissorsButton.addEventListener('click', () => {
    handleButtonPress(throws.scissors);
});

// Scoreboard component
const winsDisplay = document.getElementById('wins-display');
const drawsDisplay = document.getElementById('draws-display');
const lossesDisplay = document.getElementById('losses-display');
const winRateDisplay = document.getElementById('win-rate-display');

function displayScoreboard() {
    winsDisplay.textContent = state.wonRounds;
    drawsDisplay.textContent = state.drawnRounds;
    lossesDisplay.textContent = state.lostRounds;

    let winRate = isNaN(state.winRate) ? 0 : state.winRate;
    winRate = (winRate * 100).toFixed(1);
    winRateDisplay.textContent = winRate;
}

// page load actions
displayGame();
displayScoreboard();
