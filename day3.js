const fs = require('fs');

const filePath = 'day3.txt';
const logFilePath = 'log.txt';

fs.readFile(filePath, 'utf8', (err, corrutedMem) => {
    if (err) {
        fs.appendFileSync(logFilePath, `Oh no: ${err}\n`);
        return;
    }
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don\'t\(\)/g;
    let matchMul, x = [], y = [], mulPos = [], doPos = [], dontPos = [], mulTotal = 0;
    while ((matchMul = mulRegex.exec(corrutedMem)) !== null) {
        x.push(parseInt(matchMul[1]));
        y.push(parseInt(matchMul[2]));
        mulPos.push(matchMul.index);
    }

    while ((matchDo = doRegex.exec(corrutedMem)) !== null) doPos.push(matchDo.index);
    while ((matchDont = dontRegex.exec(corrutedMem)) !== null) dontPos.push(matchDont.index);

    fs.appendFileSync(logFilePath, `mulPos = ${mulPos}\n doPos = ${doPos}\n dontPos = ${dontPos}\n`);
    fs.appendFileSync(logFilePath, `doPos length = ${doPos.length}\ndontPos length = ${dontPos.length}\n`);

    let doPosCount = 0, dontPosCount = 0;
    for (let i = 0; i < x.length; i++) {
        if (dontPos[dontPosCount] && mulPos[i] > dontPos[dontPosCount]) {
            if (doPos[doPosCount] && mulPos[i] > doPos[doPosCount]) {
                if (doPos[doPosCount] < dontPos[dontPosCount]) {
                    fs.appendFileSync(logFilePath, `mul at pos ${mulPos[i]} has met a do at ${doPos[doPosCount]} to soon, muls are already activated ! The next dont is at Pos ${dontPos[dontPosCount]}\n`);
                    doPosCount++;
                    continue;
                } else {
                    mulTotal += x[i] * y[i];
                    fs.appendFileSync(logFilePath, `mul at pos ${mulPos[i]} has met a do at ${doPos[doPosCount]} countering the dont at Pos ${dontPos[dontPosCount]}\n`);
                    fs.appendFileSync(logFilePath, `X=${x[i]} * Y=${y[i]} = ${x[i] * y[i]}\n`);
                    while (dontPos[dontPosCount] < doPos[doPosCount]) dontPosCount++;
                    doPosCount++;
                    fs.appendFileSync(logFilePath, `The next dont is at Pos ${dontPos[dontPosCount]}, and the next do is at Pos ${doPos[doPosCount]}\n`);
                    continue;
                }
            }
            fs.appendFileSync(logFilePath, `mul at pos ${mulPos[i]} has met a dont at pos ${dontPos[dontPosCount]} and the next do is at ${doPos[doPosCount]}\n`);
        } else {
            mulTotal += x[i] * y[i];
            fs.appendFileSync(logFilePath, `mul at pos ${mulPos[i]} has not yet met a dont, the next dont is at ${dontPos[dontPosCount]}\n`);
            fs.appendFileSync(logFilePath, `X=${x[i]} * Y=${y[i]} = ${x[i] * y[i]}\n`);
        }
    }

    fs.appendFileSync(logFilePath, `Total: ${mulTotal}\n`);
});

// Part 1: Total: 196826776 ✅
// Part 2: Total: 111582664 ❌ Too high (Forgot to implement condition when do()s are met when the mul()s are already activated) 
// Part 2: Total: 106780429 ✅