// Hàm 1
const createCalculator = function () {
    return {
        add: (a, b) => a + b,

        subtract: (a, b) => a - b,

        multiply: (a, b) => a * b,

        divide: (a, b) => {
            if (b === 0) {
                return "Lỗi: chia cho 0";
            }

            return a / b;
        },
    };
};
const calculator = createCalculator();
calculator.add(2, 3); // 5
calculator.subtract(10, 4); // 6
calculator.multiply(3, 5); // 15
calculator.divide(10, 2); // 5
calculator.divide(10, 0); // "Lỗi: chia cho 0"


const average = (...numbers) => {
    if (numbers.length === 0) {
        return 0;
    }

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    return sum / numbers.length;
};
average(10, 20, 30); // 20
average(5); // 5
average(); // 0
average(1, 2, 3, 4, 5); // 3


const applyDiscount = (price, discountPercent = 10) => {
    if (!Number.isFinite(price)) {
        return "Giá không hợp lệ";
    }

    const result = price - (price * discountPercent) / 100;

    return Math.floor(result);
};

applyDiscount(100000); // 90000  (giảm 10% mặc định)
applyDiscount(100000, 20); // 80000
applyDiscount(100000, 0); // 100000
applyDiscount("abc", 10); // "Giá không hợp lệ"
applyDiscount(NaN, 10); // "Giá không hợp lệ"


const safeCalculate = (operation, ...numbers) => {
    let result;

    switch (operation) {
        case "add":
            result = 0;

            for (const number of numbers) {
                result += number;
            }
            break;

        case "subtract":
            result = numbers[0];

            for (let i = 1; i < numbers.length; i++) {
                result -= numbers[i];
            }
            break;

        case "multiply":
            result = 1;

            for (const number of numbers) {
                result *= number;
            }
            break;

        case "average":
            result = average(...numbers);
            break;

        default:
            return "Phép tính không được hỗ trợ";
    }

    if (Number.isNaN(result)) {
        return "Kết quả không hợp lệ";
    }

    return result;
};
safeCalculate("add", 1, 2, 3); // 6
safeCalculate("multiply", 2, 3, 4); // 24
safeCalculate("average", 10, 20); // 15
safeCalculate("divide", 10, 2); // "Phép tính không được hỗ trợ"
safeCalculate("add", 1, "abc", 3); // "Kết quả không hợp lệ"
