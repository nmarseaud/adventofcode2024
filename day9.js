const fs = require('fs');

const filePath = 'day9.txt';

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

    function part2() {
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
                // Get the last group of the same number
                let lastGroupStart = i;
                let groupNumber = [];
                let number = decoded[lastGroupStart];
                if (number === "X" || number === ".") continue;
                for (let j = i; j >= 0; j--) {
                    let currentNumber = decoded[j];
                    if (currentNumber === number && currentNumber !== "."  && currentNumber !== "X") {
                        groupNumber.push(currentNumber);
                    } else {
                        break;
                    }
                }
                // console.log("Number: ", number, "Group Number: ", groupNumber, "Found at: ", lastGroupStart);

                // Find the first occurence of a group of points whose length is equal to the group's length
                let groupPoint = [];
                let groupPointStart = 0;
                for (let k = 0; k < decoded.length; k++) {
                    // console.log("K: ", k, "Decoded: ", decoded[k], "Group Point: ", groupPoint, "array length: ", decoded.length);
                    if (k == decoded.length - 1) {
                        groupPoint = [];
                    } else if (decoded[k] === "." && groupPoint.length === 0) {
                        groupPoint.push('.');
                        if (groupPoint.length === groupNumber.length) {
                            groupPointStart = k - (groupPoint.length - 1);
                            break;
                        }
                    } else if (decoded[k] !== "." && groupPoint.length > 0) {
                        groupPoint = [];
                    } else if (decoded[k] === "." && groupPoint.length > 0) {
                        groupPoint.push('.');
                        if (groupPoint.length === groupNumber.length) {
                            groupPointStart = k - (groupPoint.length - 1);
                            break;
                        }
                    }
                }

                // If the index of the group of points is greater than the index of the group of numbers, break
                if (groupPointStart > lastGroupStart) {
                    // console.log("Group Point Start is greater than Last Group Start");
                    i = i - (groupNumber.length - 1);
                    continue;
                }

                // No group of points found
                if (groupPoint.length === 0) {
                    // console.log("No group of points found");
                    i = i - (groupNumber.length - 1);
                    continue;
                }

                // Swap the group of numbers with the group of points
                // console.log("Group Point: ", groupPoint, "Found at: ", groupPointStart, "for Group Number: ", groupNumber, "Found at: ", lastGroupStart);
                for (let l = 0; l < groupNumber.length; l++) {
                    [decoded[groupPointStart + l], decoded[lastGroupStart - l]] = [decoded[lastGroupStart - l], decoded[groupPointStart + l]];
                }
                i = i - (groupNumber.length - 1);
                
            }
        }

        let checkSum = 0;
        for (let i = 0; i < decoded.length; i++) {
            if (decoded[i] === ".") continue;
            checkSum += i*decoded[i];
        }
        console.log(checkSum);
    }

    part2();
});

// Part 1: 6211348208140 ✅
// Part 2: 6239783302560 ✅ YEAH FOR LOOPS BABY!