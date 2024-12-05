const fs = require('fs');

const filePath = 'day5.txt';
const logFilePath = 'log.txt';

checkRulesPart1 = (update = [], rules) => {
    let valid = true;
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const rulesOfPage = rules.filter(rule => rule[0] === page);
        for (let j = 0; j < rulesOfPage.length; j++) {
            const rule = rulesOfPage[j];
            if (update.includes(rule[1])) {
                if (i < update.indexOf(rule[1])) {
                    continue;
                } else {
                    fs.appendFileSync(logFilePath, (`The update ${update} is wrong because ${rule[0]} is after ${rule[1]} transgressing rule ${rule[0]}|${rule[1]}\n`));
                    valid = false;
                }
            }
        }
    }
    if (valid) {
        fs.appendFileSync(logFilePath, (`The update ${update} is valid\n`));
        return update;
    } else {
        return [];
    }
}

checkRulesPart2 = (update = [], rules) => {
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const rulesOfPage = rules.filter(rule => rule[0] === page);
        for (let j = 0; j < rulesOfPage.length; j++) {
            const rule = rulesOfPage[j];
            if (update.includes(rule[1])) {
                if (i < update.indexOf(rule[1])) {
                    continue;
                } else {
                    fs.appendFileSync(logFilePath, (`The update ${update} was wrong because ${rule[0]} is after ${rule[1]} transgressing rule ${rule[0]}|${rule[1]}\n`));
                    // Solution found in this article : https://www.geeksforgeeks.org/how-to-move-an-array-element-from-one-array-position-to-another-in-javascript/
                    // [array[indexFrom], array[indexTo]] = [array[indexTo], array[indexFrom]]; 
                    fs.appendFileSync(logFilePath, (`update before ${update}\n`));
                    let newIndex = update.indexOf(page) - 1;
                    if  (newIndex < 0) {
                        newIndex = 0;
                    }
                    [update[update.indexOf(page)], update[newIndex]] = [update[newIndex], update[update.indexOf(page)]];
                    fs.appendFileSync(logFilePath, (`update after ${update}\n`));
                }
            }
        }
    }
    fs.appendFileSync(logFilePath, (`The update ${update} is now valid\n`));
    return update;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        fs.appendFileSync(logFilePath, `Oh no: ${err}\n\n`);
        return;
    }
    // Clean the log file
    fs.writeFileSync(logFilePath, '');

    // Split the content into sections
    const sections = data.split('x\r\n');
    const [firstSectionRaw, secondSectionRaw] = sections;

    // Process the first section
    const rules = firstSectionRaw.split('\n').map(line => line.split('|').map(Number));
    rules.pop(); // Remove the last empty line

    // Process the second section
    const updates = secondSectionRaw.split('\n').map(line => line.split(',').map(Number));

    // Part 1
    let middleValuecountPart1 = 0;
    let part1CorrectUpdates = [];
    updates.forEach(update => {
        const result = checkRulesPart1(update, rules);
        if (result.length > 0) {
            const middleValue = update[Math.floor(update.length / 2)];
            fs.appendFileSync(logFilePath, (`Middle value of update ${update} is ${middleValue}\n`));
            middleValuecountPart1+=middleValue;
            part1CorrectUpdates.push(update);
        }
    });
    fs.appendFileSync(logFilePath, `${middleValuecountPart1}\n`);
    
    // Part 2
    let middleValuecountPart2 = 0;

    // Remove the arrays in part1CorrectUpdates from the updates array
    const remainingUpdates = updates.filter(update => 
        !part1CorrectUpdates.some(correctUpdate => 
            JSON.stringify(correctUpdate) === JSON.stringify(update)
        )
    );

    remainingUpdates.forEach(update => {
        const result = checkRulesPart2(update, rules);
        if (result) {
            const middleValue = update[Math.floor(update.length / 2)];
            fs.appendFileSync(logFilePath, (`Middle value of update ${update} is ${middleValue}\n`));
            middleValuecountPart2 += middleValue;
        }
    });
    fs.appendFileSync(logFilePath, `${middleValuecountPart2}\n`);
});

// Part 1: Total: 5166 ✅
// Part 2: Total: 4479 ❌ Too low
// Part 2: Total: 4592 ❌ Still too low
// Part 2: Total: 4679 ✅ Is the correct answer but logs are wrong ??