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
var currentPos = [1, 1];
var code = '';
var x = 1;
var y = 0;

keypad = getFormattedKeypad(keypad);

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

function followInstruction(instruction) {
    if (instruction === 'U') {
        if (keypad[currentPos[y] - 1]) {
            currentPos[y]--;
        }
    } else if (instruction === 'L') {
        if (keypad[currentPos[x] - 1]) {
            currentPos[x]--;
        }
    } else if (instruction === 'D') {
        if (keypad[currentPos[y] + 1]) {
            currentPos[y]++;
        }
    } else if (instruction === 'R') {
        if (keypad[currentPos[x] + 1]) {
            currentPos[x]++;
        }
    }
}

function solvePart1() {
    for (row of formattedInstructions) {
        for (instruction of row) {
            followInstruction(instruction);
        }

        code += keypad[currentPos[y]][currentPos[x]].toString();
    }

    console.log(`the code is ${code}`);
}

solvePart1();