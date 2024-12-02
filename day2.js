const fs = require('fs');

const filePath = 'day2.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Oh no:', err);
        return;
    }
    const line = data.split("\n").map((r) => r.split(" ").map(Number))
 
    // Check if a report is safe
    const isReportSafe = (report) => {
        const diffs = report.slice(1).map((level, i) => level - report[i])
        const isIncreasing = diffs[0] > 0
    
        return diffs.every((diff) => Math.abs(diff) >= 1 && Math.abs(diff) <= 3 && diff > 0 === isIncreasing)
    }
    
    // Check if removing one level makes the report safe
    const isSafeWithOneRemoval = (report) =>
        report.some((_, i) => isReportSafe(report.slice(0, i).concat(report.slice(i + 1))))
    
    // Part 1: Count reports that are directly safe
    const part1 = (line) => line.filter(isReportSafe).length
    
    // Part 2: Count reports that are safe or can be made safe by removing one level
    const part2 = (line) => line.filter((report) => isReportSafe(report) || isSafeWithOneRemoval(report)).length
    
    console.time("Part 1 Time")
    console.log("Part 1:", part1(line))
    console.timeEnd("Part 1 Time")
    
    console.time("Part 2 Time")
    console.log("Part 2:", part2(line))
    console.timeEnd("Part 2 Time")
});