var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var currentPosition = {
    x: 0,
    y: 0
};
var dir = 'north';
var dirTable = {
    'north': {
        'L': 'west',
        'R': 'east'
    },
    'west': {
        'L': 'south',
        'R': 'north'
    },
    'south': {
        'L': 'east',
        'R': 'west'
    },
    'east': {
        'L': 'north',
        'R': 'south'
    }
};

console.log(input);
instructions = input.split(', ');

function getDirAndLength(instruction) {
    let dirAndLength = instruction.split('');

    console.log('dir and len');
    console.log(dirAndLength);

    return {
        dir: dirAndLength.shift(),
        dist: Number(dirAndLength.join(''))
    };
}

function getDistance() {
    return Math.abs(currentPosition.x) + Math.abs(currentPosition.y);
}

function solvePart1() {
    for (let i = 0; i < instructions.length; ++i) {
        let instruction = getDirAndLength(instructions[i]);
        let dist = instruction.dist;

        dir = dirTable[dir][instruction.dir];

        switch (dir) {
            case 'north':
                currentPosition.y += dist;
                break;
            case 'west':
                currentPosition.x -= dist;
                break;
            case 'south':
                currentPosition.y -= dist;
                break;
            case 'east':
                currentPosition.x += dist;
                break;
        }
    }

    console.log(`current position: ${currentPosition.x}, ${currentPosition.y}, distance: ${getDistance()}`);
}

solvePart1();