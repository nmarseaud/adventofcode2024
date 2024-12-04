const fs = require('fs');

const filePath = 'day4.txt';
const logXMASFilePath = 'logXMAS.txt';
const logFilePath = 'log.txt';

// -------------------------------------------------------FAIL-------------------------------------------------------
// Returns the position in x/y of a character in a string
const getCharacterXY = (charater, string) => {
    const positions = [];
    const lines = string.split('\n');
    for (let y = 0; y < lines.length; y++) {
        let x = lines[y].indexOf(charater);
        while (x !== -1) {
            positions.push([x, y]);
            x = lines[y].indexOf(charater, x + 1);
        }
    }
    return positions;
}

const lookForXMASaround = (x, y, string) => {
    const directions = [
        [0, 1, 'Right'],   // Right
        [1, 0, 'Down'],   // Down
        [1, 1, 'Down-Right'],   // Down-Right
        [-1, 1, 'Up-Right'],  // Up-Right 
        [0, -1, 'Left'],  // Left
        [-1, 0, 'Up'],  // Up
        [-1, -1, 'Up-Left'], // Up-Left
        [1, -1, 'Down-Left']   // Down-Left
    ];
    const word = 'XMAS';
    const lines = string.split('\n');
    const wordLength = word.length;

    for (const [directionX, directionY, direction] of directions) {
        let found = true;
        for (let i = 0; i < wordLength; i++) {
            const newPosX = x + directionX * i;
            const newPosY = y + directionY * i;
            // Check if the new Y position is out of bounds
            if (newPosY < 0 || newPosY >= lines.length) {
                found = false;
                break;
            }
            // Check if the new X position is out of bounds
            if (newPosX < 0 || newPosX >= lines[newPosY].length) {
                found = false;
                break;
            }
            // Check if the character at the new position does not match the expected character in the word
            if (lines[newPosY][newPosX] !== word[i]) {
                found = false;
                break;
            } else {
                fs.appendFileSync(logXMASFilePath,`${lines[newPosY][newPosX]} at i=${i}\n`);
                fs.appendFileSync(logXMASFilePath,`Found "${word[i]}" at (${newPosX}, ${newPosY}) in direction ${direction}\n`);
            }
        }
        if (found) {
            fs.appendFileSync(logXMASFilePath,`Found "XMAS" starting at (${x}, ${y}) in direction ${direction}\n`);
            return true;
        }
    }
    return false;
}
// -------------------------------------------------------FAIL-------------------------------------------------------
// -------------------------------------------------------STOLE THAT-------------------------------------------------------

fs.readFile(filePath, 'utf8', (err, rawInput) => {
    if (err) {
        fs.appendFileSync(logFilePath, `Oh no: ${err}\n`);
        return;
    }
 
    const parseInput = (rawInput) => rawInput.split(/\r?\n/).map((row) => row.split(""))
    
    const data = parseInput(rawInput)
    
    const rows = data.length
    const cols = data[0].length
    
    // Directions for part 1
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
        [0, -1],
        [-1, 0],
        [-1, -1],
        [-1, 1]
    ]
    
    // Check for XMAS in part 1
    const checkWord = (x, y, dx, dy, grid, word) => {
        for (let i = 0; i < word.length; i++) {
            const nx = x + i * dx
            const ny = y + i * dy
            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[ny][nx] !== word[i]) {
                return false
            }
        }
        return true
    }
    
    // Part 1: Count all occurrences of "XMAS"
    const part1 = (grid) => {
        let count = 0
        const word = "XMAS"
    
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                for (const [dx, dy] of directions) {
                    if (checkWord(x, y, dx, dy, grid, word)) count++
                }
            }
        }
        return count
    }
    
    // Part 2: Count all "X-MAS" patterns
    const part2 = (grid) => {
        let count = 0
        for (let x = 1; x < rows - 1; x++) {
            for (let y = 1; y < cols - 1; y++) {
                if (grid[x][y] === "A") {
                    const tlbr =
                        (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
                        (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M")
                    const trbl =
                        (grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
                        (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M")
                    if (tlbr && trbl) count++
                }
            }
        }
        return count
    }
 
    console.time("Part 1 Time")
    console.log("Part 1:", part1(data))
    console.timeEnd("Part 1 Time")
    
    console.time("Part 2 Time")
    console.log("Part 2:", part2(data))
    console.timeEnd("Part 2 Time")
});

// Part 1: Total: 1990 ❌ Too low (Forgot to check for "SAMX")
// Part 1: Total: 4075 ❌ Too high (I give up)
// Part 1: I find 25 on sample instead of 18
// Part 1: Right Answer was 2639
