const fs = require('fs');

const filePath = 'day1.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Oh no:', err);
        return;
    }
    // console.log('File content:', data);
    const lines = data.split('\n');
    let leftColumn = [];
    let rightColumn = [];

    lines.forEach(line => {
        const [left, right] = line.split('   ').map(Number);
        leftColumn.push(left);
        rightColumn.push(right);
    });

    // console.log('Left column:', leftColumn);
    // console.log('Right column:', rightColumn);
    let totalDistance = 0;
    let similarity = 0;
    for (let i = 0; i < leftColumn.length; i++) {
        leftNumber = leftColumn[i];
        let found = 0;
        console.log('Left number:', leftNumber);
        for (let i = 0; i < rightColumn.length; i++) {
            let rightNumber = rightColumn[i];
            if (leftNumber === rightNumber) {
                found++;
            }
        }
        similarity += leftNumber * found;
    }
    while (leftColumn.length > 0) {
        let leftMin = Math.min(...leftColumn);
        let rightMin = Math.min(...rightColumn);
        // console.log('Left min:', leftMin, 'Right min:', rightMin);
        let distance = leftMin > rightMin ? leftMin - rightMin : rightMin - leftMin;
        // console.log('Distance:', distance);
        totalDistance += distance;
        leftColumn.splice(leftColumn.indexOf(leftMin), 1);
        rightColumn.splice(rightColumn.indexOf(rightMin), 1);
    }
    console.log('Total distance:', totalDistance);
    console.log('similarity:', similarity);
});