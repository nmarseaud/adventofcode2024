const fs = require('fs');

const filePath = 'day9sample.txt';
const logFilePath = 'log.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.clear();
    function part1() {
        const numbers = data.split('').map(num => parseInt(num, 10));
        const decoded = [];
        let currentState = "file";
        let idCount = 0;
        for (let i = 0; i < numbers.length; i++) {
            if  (currentState === "file") {
                for (let j = 0; j < numbers[i]; j++) decoded.push(idCount);
                idCount++;
                currentState = "freespace";
            } else if (currentState === "freespace") {
                for (let j = 0; j < numbers[i]; j++) decoded.push(".");
                currentState = "file";
            }
        }

        for (let i = decoded.length - 1; i >= 0; i--) {
            if (decoded[i] !== ".") {
                let firstPointIndex = decoded.indexOf(".");
                if (firstPointIndex > i) break;
                [decoded[i], decoded[firstPointIndex]] = [decoded[firstPointIndex], decoded[i]];
            }
        }

        let checkSum = 0;
        for (let i = 0; i < decoded.length; i++) {
            if (decoded[i] === ".") break;
            checkSum += i*decoded[i];
        }
        console.log(checkSum);
    }
    part1();
});