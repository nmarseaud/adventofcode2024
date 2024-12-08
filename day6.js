const fs = require('fs');

const filePath = 'day6sample.txt';
const logFilePath = 'log.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        fs.appendFileSync(logFilePath, `Oh no: ${err}\n\n`);
        return;
    }
    // Clean the log file
    fs.writeFileSync(logFilePath, '');
    
    const map = data.split('\n');
    const mapArray = map.map(line => line.split(''));
    fs.appendFileSync(logFilePath, `\n\n${mapArray.map(line => line.join('')).join('\n')}\n\n`);
    let guardPos = [0, 0, 'up']; // x/y position, direction
    map.forEach((line, index) => {
        if (line.includes('^')) {
            guardPos[0] = index;
            guardPos[1] = line.indexOf('^');
        }
    });
    fs.appendFileSync(logFilePath, `${guardPos}\n`);

    function takeAStep(mapArray, guardPos) {
        const directions = ['up', 'right', 'down', 'left'];
        while (true) {
            const [y, x, direction] = guardPos;
            let newMapArray = [...mapArray]; // Create a shallow copy of the map array
            let newY = y;
            let newX = x;
            switch (direction) {
                case 'up':
                    newY = y - 1;
                    break;
                case 'right':
                    newX = x + 1;
                    break;
                case 'down':
                    newY = y + 1;
                    break;
                case 'left':
                    newX = x - 1;
                    break;
            }
            if (typeof newMapArray[newY] === 'undefined' || typeof newMapArray[newY][newX] === 'undefined') {
                newMapArray[y][x] = "X";
                break;
            } else if (newMapArray[newY][newX] === '#') {
                guardPos[2] = direction === 'left' ? directions[0] : directions[directions.indexOf(direction) + 1];
            } else {
                guardPos[0] = newY;
                guardPos[1] = newX;
                if (newMapArray[y][x] !== 'O') newMapArray[y][x] = "X";
            }
        }
    }
    
    takeAStep(mapArray, guardPos);
    const mapString = mapArray.map(line => line.join('')).join('\n');
    const charArray = mapString.replace(/\n/g, '').split('');
    const result = charArray.filter(char => char === 'X').length;
    fs.appendFileSync(logFilePath ,`\n\n${mapString}\n\n`);
    fs.appendFileSync(logFilePath ,`Result : ${result}`);
});

// Part 1: 5306 ❌ Too high
// Part 1: 5305 ❌ Wrong (thought there was an extra X)
// Part 1: 5304 ❌ Wrong (thought I had to keep the starting pos clean)
// Part 1: 5305 ✅ Actually correct (website bug ?)