export const throws = {
    get rock() {
        return 'rock';
    },
    get paper() {
        return 'paper';
    },
    get scissors() {
        return 'scissors';
    },
};

export const results = {
    get playerWin() {
        return 'player';
    },
    get computerWin() {
        return 'computer';
    },
    get draw() {
        return 'draw';
    }
};

const throwsArray = [throws.rock, throws.paper, throws.scissors];

export function getRandomThrow() {
    return throwsArray[Math.floor(Math.random() * throwsArray.length)];
}

const scoreMap = new Map();

scoreMap.set(`${throws.rock}:${throws.rock}`, results.draw);
scoreMap.set(`${throws.rock}:${throws.paper}`, results.computerWin);
scoreMap.set(`${throws.rock}:${throws.scissors}`, results.playerWin);

scoreMap.set(`${throws.paper}:${throws.rock}`, results.playerWin);
scoreMap.set(`${throws.paper}:${throws.paper}`, results.draw);
scoreMap.set(`${throws.paper}:${throws.scissors}`, results.computerWin);

scoreMap.set(`${throws.scissors}:${throws.rock}`, results.computerWin);
scoreMap.set(`${throws.scissors}:${throws.paper}`, results.playerWin);
scoreMap.set(`${throws.scissors}:${throws.scissors}`, results.draw);

export function scoreRound(playerThrow, computerThrow) {
    return scoreMap.get(`${playerThrow}:${computerThrow}`);
}
