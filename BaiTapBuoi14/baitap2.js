function calculateScore(level, kills, boosted) {
   if (typeof level !== "number" || typeof kills !== "number" || level < 0 || kills < 0) {
    return "Dữ liệu không hợp lệ"
   }

   if (typeof boosted !== "boolean") {
    boosted =false
   }
    let baseScore = kills * 10;
    let bonusScore = level >= 5 ? baseScore * 0.5 : baseScore * 0.2;
    let finalScore = boosted
        ? (baseScore + bonusScore) * 2
        : baseScore + bonusScore;
    return Math.floor(finalScore);
}

console.log(calculateScore(5, 20, true));
// 600
console.log(calculateScore(3, 10, false));
// 120
console.log(calculateScore(5, 15, false));
// 225
console.log(calculateScore(1, 50, true));
// 1200
console.log(calculateScore(-1, 10, true));
// "Dữ liệu không hợp lệ"
console.log(calculateScore(2, -5, false));
// "Dữ liệu không hợp lệ"
console.log(calculateScore("abc", 10, true));
// "Dữ liệu không hợp lệ"
console.log(calculateScore(2, "abc", false));
// "Dữ liệu không hợp lệ"
console.log(calculateScore(5, 15, null));
// 225  (boosted = false)
console.log(calculateScore(5, 15, "yes"));
// 225  (boosted = false)
console.log(calculateScore(5, 15, undefined));
// 225  (boosted = false)
