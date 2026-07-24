function formatBirthday(dateString) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

console.log(formatBirthday("1995-03-25"));
console.log(formatBirthday("2000-12-01"));

function getAge(birthDateString, currentDateString) {
    const birthParts = birthDateString.split("-");

    const currentParts = currentDateString.split("-");

    const birthYear = Number(birthParts[0]);
    const birthMonth = Number(birthParts[1]);
    const birthDay = Number(birthParts[2]);

    const currentYear = Number(currentParts[0]);
    const currentMonth = Number(currentParts[1]);
    const currentDay = Number(currentParts[2]);

    let initialAge = currentYear - birthYear;

    if (currentMonth < birthMonth) {
        initialAge--;
    } else if (currentMonth === birthMonth) {
        if (currentDay < birthDay) {
            initialAge--;
        }
    }

    return initialAge;
}

console.log(getAge("1995-03-25", "2026-07-19"));
// 31  (đã qua sinh nhật tháng 3)
console.log(getAge("2000-12-01", "2026-07-19"));
// 25  (chưa tới sinh nhật tháng 12, nên chưa tính là 26)
console.log(getAge("1995-08-01", "2026-07-19"));
// 30  (còn vài ngày nữa mới tới sinh nhật)

function getDayOfWeekName(dateString) {
    const date = new Date(dateString);

    const day = date.getDay();

    const days = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
    ];

    return days[day];
}

console.log(getDayOfWeekName("2026-07-19")); // "Chủ nhật"

console.log(getDayOfWeekName("2000-01-01")); // "Thứ bảy");
