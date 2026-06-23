function analyzeClass(scores) {
    let invalidCount = 0;
    let validCount = 0;
    let sum = 0;

    let maxScore = null;
    let minScore = null;

    let excellentCount = 0;
    let goodCount = 0;
    let fairCount = 0;
    let averageCount = 0;
    let weakCount = 0;

    let average = 0;

    let comment;

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];

        // Kiểm tra số điểm ko hợp lệ
        if (score > 10 || score < 0) invalidCount++;
        // Kiểm tra điều kiện
        else {
            // Kiểm tra số điểm hợp lệ vs tổng điểm hợp lệ
            validCount++;
            sum += score;

            // Kiểm tra điểm lớn và nhỏ nhất

            if (maxScore === null) {
                maxScore = score;
                minScore = score;
            }

            if (score > maxScore) {
                maxScore = score;
            }

            if (score < minScore) {
                minScore = score;
            }

            // Kiểm tra xếp loại

            if (score >= 9) {
                excellentCount++;
            } else if (score >= 8) {
                goodCount++;
            } else if (score >= 6.5) {
                fairCount++;
            } else if (score >= 5) {
                averageCount++;
            } else {
                weakCount++;
            }
        }
    }

    // Điểm trung bình

    if (validCount !== 0) {
        average = sum / validCount;
    } else {
        average = 0;
    }

    // Làm tròn 2 chữ số thập phân

    average = Math.round(average * 100) / 100;

    // Nhận xét

    if (validCount === 0) {
        comment = "Không có dữ liệu hợp lệ";
    } else if (fairCount + goodCount + excellentCount > validCount / 2) {
        comment = "Lớp học tốt";
    } else if (weakCount > validCount / 2) {
        comment = "Cần cải thiện";
    } else {
        comment = "Lớp học ở mức ổn";
    }

    return {
        invalidCount,
        validCount,
        sum,
        maxScore,
        minScore,
        excellentCount,
        goodCount,
        fairCount,
        averageCount,
        weakCount,
        average,
        comment,
    };
}

console.log(analyzeClass([9, 7, -2, 5.5, 10, 4, 11, 6.5, 8]));
