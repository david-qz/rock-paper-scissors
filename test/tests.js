import {
    throws,
    results,
    getRandomThrow,
    scoreRound,
} from '../utils.js';

const test = QUnit.test;

test('rock paper scissors scoring', (expect) => {
    expect.equal(scoreRound(throws.rock, throws.rock), results.draw);
    expect.equal(scoreRound(throws.rock, throws.paper), results.computerWin);
    expect.equal(scoreRound(throws.rock, throws.scissors), results.playerWin);

    expect.equal(scoreRound(throws.paper, throws.rock), results.playerWin);
    expect.equal(scoreRound(throws.paper, throws.paper), results.draw);
    expect.equal(scoreRound(throws.paper, throws.scissors), results.computerWin);

    expect.equal(scoreRound(throws.scissors, throws.rock), results.computerWin);
    expect.equal(scoreRound(throws.scissors, throws.paper), results.playerWin);
    expect.equal(scoreRound(throws.scissors, throws.scissors), results.draw);
});

test('rock paper scissors random throw', (expect) => {
    const set = new Set();
    for (let i = 0; i < 100; i++) {
        set.add(getRandomThrow());
    }

    // Assert that we've only seen three values
    expect.equal(set.size, 3);

    // Assert that we've only seen *our* three values
    expect.equal(set.has(throws.rock), true);
    expect.equal(set.has(throws.paper), true);
    expect.equal(set.has(throws.scissors), true);

    // TODO: Test that we've got a flat distribution
});

test('throws and results immutability', (expect) => {
    let mutatedRock = throws.rock;
    mutatedRock += 'oops';
    expect.notEqual(throws.rock, mutatedRock);

    let mutatedDraw = results.draw;
    mutatedDraw += 'did it again';
    expect.notEqual(results.draw, mutatedDraw);
});
