const examResults = [
    { student: "An", scores: [8.5, 7, 9, 6.5] },
    { student: "Bình", scores: [10, 9.5, 8, 10] },
    { student: "Chi", scores: [5, 4.5, 6, 5.5] },
    { student: "Duy", scores: [7, 7, 7, 7] },
];


function getAverage(scores) {
    let sum = 0;

    for (const score of scores) {
        sum += score;
    }

    const average = sum / scores.length;

    return Number(average.toFixed(1));
}

getAverage([8.5, 7, 9, 6.5])   // 7.75 -> 7.8
getAverage([10, 9.5, 8, 10])   // 9.375 -> 9.4


function classifyStudent(average) {
    if (average >= 9) {
        return "Xuất sắc";
    } else if (average >= 8) {
        return "Giỏi";
    } else if (average >= 6.5) {
        return "Khá";
    } else if (average >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

classifyStudent(9.4)   // "Xuất sắc"
classifyStudent(7.8)   // "Khá"
classifyStudent(4.5)   // "Yếu"



function isValidScore(score) {
    return Number.isFinite(score) && score >= 0 && score <= 10;
}
isValidScore(8.5)        // true
isValidScore(-1)         // false
isValidScore(11)         // false
isValidScore(Infinity)   // false
isValidScore(NaN)        // false


function getReportCard(examResults) {
    const reports = [];

    for (const result of examResults) {
        let valid = true;

       
        for (const score of result.scores) {
            if (!isValidScore(score)) {
                valid = false;
                break;
            }
        }

        if (!valid) {
            continue;
        }

        const average = getAverage(result.scores);
        const classification = classifyStudent(average);

        reports.push({
            student: result.student,
            average: average,
            classification: classification,
        });
    }

    return reports;
}

console.log(getReportCard(examResults));
getReportCard(examResults)
// [
//   { student: "An",   average: 7.8, classification: "Khá" },
//   { student: "Bình", average: 9.4, classification: "Xuất sắc" },
//   { student: "Chi",  average: 5.3, classification: "Trung bình" },
//   { student: "Duy",  average: 7,   classification: "Khá" },
// ]
