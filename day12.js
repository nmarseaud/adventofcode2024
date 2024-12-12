const fs = require('fs');

const filePath = 'day12sample.txt';

fs.readFile(filePath, 'utf8', (err, rawData) => {
    if (err) {
        console.error(err);
        return;
    }
    const parseRawData = (rawData) => rawData.split(/\r?\n/).map((row) => row.split(""))
    
    const field = parseRawData(rawData)

    console.log(field);

    let currentPlant = "";
    let plots = []; // [{plant: "A", distribution: [[A, A, A, A, A]]}, {plant: "B", distribution: [[B, B],[B, B]]}]
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            currentPlant = field[y][x];
            if (currentPlant !== '') {
                let plot = plots.find(p => p.plant === currentPlant);
                if (!plot) {
                    plot = { plant: currentPlant, distribution: [] };
                    plots.push(plot);
                }
                if (!plot.distribution[y]) {
                    plot.distribution[y] = [];
                }
                plot.distribution[y].push(currentPlant);
            }
        }
    }
    // Remove empty arrays from distribution
    plots.forEach(plot => {
        plot.distribution = plot.distribution.filter(row => row.length > 0);
    });
    console.log(plots);

    let totalFencingPrice = 0;
    for (let plot of plots) {
        let distribution = plot.distribution;
        let plantCount = 0;
        let perimeter = 0;
        for (let y = 0; y < distribution.length; y++) {
            for (let x = 0; x < distribution[y].length; x++) {
                plantCount++;
                if (distribution[y][x]) {
                    // Check top
                    if (y === 0 || !distribution[y - 1][x]) perimeter++;
                    // Check bottom
                    if (y === distribution.length - 1 || !distribution[y + 1][x]) perimeter++;
                    // Check left
                    if (x === 0 || !distribution[y][x - 1]) perimeter++;
                    // Check right
                    if (x === distribution[y].length - 1 || !distribution[y][x + 1]) perimeter++;
                }
            }
        }
        plot.perimeter = perimeter;
        plot.plantCount = plantCount;
        plot.fencingPrice = perimeter * plantCount;
        plot.distribution = JSON.stringify(distribution);
        totalFencingPrice += plot.fencingPrice;
    }
    console.log(plots);
    console.log(totalFencingPrice);
});