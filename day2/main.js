var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');

// input = `ULL
// RRDDD
// LURDL
// UUUUD`

var formattedInstructions = getFormattedInstructions(input);
var keypad = `1 2 3
4 5 6
7 8 9`;
var keypad2 = `x x 1
x 2 3 4
5 6 7 8 9
x A B C
x x D`;
var currentPos = [1, 1];
var code = '';
var x = 1;
var y = 0;

keypad = getFormattedKeypad(keypad);
keypad2 = getFormattedKeypad(keypad2);

function reset() {
    currentPos = [1, 1];
    code = '';
}

function getFormattedKeypad(keypad) {
    let rows = keypad.split('\n').map(row => row.split('\r')[0]);

    return rows.map(row => row.split(' '));
}

function getFormattedInstructions(input) {
    let rows = input.split('\n');

    rows = rows.map(row => row.split('\r')[0]);
    rows = rows.map(row => row.split(''));

    return rows;
}

function followInstruction(instruction, keypad) {
    if (instruction === 'U') {
        if (keypad[currentPos[y] - 1] && keypad[currentPos[y] - 1][currentPos[x]] && keypad[currentPos[y] - 1][currentPos[x]] !== 'x') {
            currentPos[y]--;
        }
    } else if (instruction === 'L') {
        if (keypad[currentPos[y]][currentPos[x] - 1] && keypad[currentPos[y]][currentPos[x] - 1] !== 'x') {
            currentPos[x]--;
        }
    } else if (instruction === 'D') {
        if (keypad[currentPos[y] + 1] && keypad[currentPos[y] + 1][currentPos[x]] && keypad[currentPos[y] + 1][currentPos[x]] !== 'x') {
            currentPos[y]++;
        }
    } else if (instruction === 'R') {
        if (keypad[currentPos[y]][currentPos[x] + 1] && keypad[currentPos[y]][currentPos[x] + 1] !== 'x') {
            currentPos[x]++;
        }
    }
}

function solvePart1() {
    for (row of formattedInstructions) {
        for (instruction of row) {
            followInstruction(instruction, keypad);
        }

        code += keypad[currentPos[y]][currentPos[x]].toString();
    }

    console.log(`the code is ${code}`);
}

function solvePart2() {
    currentPos = [2, 0];

    for (row of formattedInstructions) {
        for (instruction of row) {
            followInstruction(instruction, keypad2);
        }

        code += keypad2[currentPos[y]][currentPos[x]].toString();
    }

    console.log(`the code is ${code}`);
}

solvePart1();
reset();
solvePart2();