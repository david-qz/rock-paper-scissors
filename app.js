// import needed modules
import {
    throws,
    results,
    getRandomThrow,
    scoreRound,
} from '../utils.js';

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
    // component
    // define and grab DOM elements
    // display functions
    // optional: subscribe to events
        // event handlers - what needs to happen?
        // logic and calculations
        // state update
        // re-display components (which ones?)
    // optional: handle functions for shared event handler logic

// Game Display Component
const playerThrowImg = document.getElementById('player-throw-image');
const computerThrowImg = document.getElementById('computer-throw-image');
const gameMessage = document.getElementById('game-message');

const imgMap = new Map();
imgMap.set(throws.rock, 'assets/rock.png');
imgMap.set(throws.paper, 'assets/paper.png');
imgMap.set(throws.scissors, 'assets/scissors.png');
imgMap.set(null, 'assets/question.png');            // null and undefined mappings work,
imgMap.set(undefined, 'assets/question.png');       // to my surprise.

function displayGame() {
    playerThrowImg.src = imgMap.get(state.playerThrow);
    computerThrowImg.src = imgMap.get(state.computerThrow);

    switch (state.didWin) {
        case results.playerWin:
            gameMessage.textContent = 'You Won!';
            break;
        case results.computerWin:
            gameMessage.textContent = 'You Lost!';
            break;
        case results.draw:
            gameMessage.textContent = 'A Draw!';
            break;
        default:
            gameMessage.textContent = 'Make a Throw!';
            break;
    }
}

// page load actions
displayGame();
