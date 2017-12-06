var fs = require('fs');
var inputFile = './input.txt';
var input = fs.readFileSync(inputFile, 'utf8');
var currentPosition = [0, 0];
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
var visitedLocations = [];
var easterBunnyHQPosition = [];

visitedLocations.push(copyObject(currentPosition));
instructions = input.split(', ');

function reset() {
    visitedLocations = [];
    easterBunnyHQPosition = [];
    currentPosition = [0, 0];
    dir = 'north';
}

function getDirAndLength(instruction) {
    let dirAndLength = instruction.split('');

    return {
        dir: dirAndLength.shift(),
        dist: Number(dirAndLength.join(''))
    };
}

function getDistance() {
    return Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]);
}

function copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function compareArrays(arr1, arr2) {
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function getHasVisitedBefore(position) {
    for (let i = 0; i < visitedLocations.length; ++i) {
        if (compareArrays(position, visitedLocations[i]))
            return true;
    }

    return false;
}

function followInstructionPart2(instruction) {
    let dist;

    instruction = getDirAndLength(instruction);
    dist = instruction.dist;
    dir = dirTable[dir][instruction.dir];

    for (let i = 0; i < dist; ++i) {
        switch (dir) {
            case 'north':
            currentPosition[1] += 1;
            break;
            case 'west':
            currentPosition[0] -= 1;
            break;
            case 'south':
            currentPosition[1] -= 1;
            break;
            case 'east':
            currentPosition[0] += 1;
            break;
        }

        if (getHasVisitedBefore(currentPosition)) {
            easterBunnyHQPosition = copyObject(currentPosition);
            break;
        } else {
            visitedLocations.push(copyObject(currentPosition));
        }
    }
}

function followInstructionPart1(instruction) {
    let dist;

    instruction = getDirAndLength(instruction);
    dist = instruction.dist;
    dir = dirTable[dir][instruction.dir];

    switch (dir) {
        case 'north':
            currentPosition[1] += dist;
            break;
        case 'west':
            currentPosition[0] -= dist;
            break;
        case 'south':
            currentPosition[1] -= dist;
            break;
        case 'east':
            currentPosition[0] += dist;
            break;
    }
}

function solvePart1() {
    for (let i = 0; i < instructions.length; ++i) {
        followInstructionPart1(instructions[i]);
    }

    console.log(`current position: ${currentPosition[0]}, ${currentPosition[1]}, distance: ${getDistance()}`);
}

function solvePart2() {
    for (let i = 0; i < instructions.length; ++i) {
        followInstructionPart2(instructions[i]);

        if (easterBunnyHQPosition.length) {
            break;
        }
    }

    console.log(`current position: ${currentPosition[0]}, ${currentPosition[1]}, distance: ${getDistance()}`);
}

solvePart1();
reset();
solvePart2();