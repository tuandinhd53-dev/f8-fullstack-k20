function addDays(dateString, days) {
    const date = new Date(dateString);

    const newDay = date.getDate() + days;

    date.setDate(newDay);

    return date.toISOString().split("T")[0];
}

console.log(addDays("2026-07-19", 10));
// "2026-07-29"
console.log(addDays("2026-07-25", 10));
// "2026-08-04"
console.log(addDays("2026-01-01", -5));
// "2025-12-27"

function getDaysBetween(date1String, date2String) {
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    const diff = date2 - date1;

    return diff / (1000 * 60 * 60 * 24);
}

console.log(getDaysBetween("2026-07-19", "2026-08-01"));
// 13
console.log(getDaysBetween("2026-01-01", "2026-12-31"));
// 364

function isExpired(expiryDateString, currentDateString) {
    const expiryDate = new Date(expiryDateString);
    const currentDate = new Date(currentDateString);

    return expiryDate <= currentDate;
}

console.log(isExpired("2026-07-01", "2026-07-19"));
// true  (đã qua ngày hết hạn)
console.log(isExpired("2026-12-31", "2026-07-19"));
// false (chưa tới hạn)

function getCountdown(targetDateString, currentDateString) {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date(currentDateString);

    const diff = targetDate - currentDate;

    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remainingMilliseconds = diff % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
    if (diff < 0) {
        return `Đã quá hạn`;
    }
    return `Còn ${day} ngày ${hours} giờ`;
}

console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00")); // "Còn 12 ngày 12 giờ"

console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));
// "Đã qua hạn");

