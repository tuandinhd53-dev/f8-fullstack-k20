function classifyTriangle(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        return "Cạnh không hợp lệ";
    }

    if (a + b < c || a + c < b || b + c < a) {
        return "Không tạo thành tam giác";
    }

    if (a === b && a === c) {
        return "Tam giác đều";
    }

    //  Kiểm tra cạnh lớn nhất phải là huyền

    const [x, y, z] = [a, b, c].sort((a, b) => a - b);

    // Tam giác vuông

    const isRight = x * x + y * y === z * z;

    // Tam giác cân
    const isIsosceles = a === b || a === c || b === c;

    if (isRight && isIsosceles) {
        return " Tam giác vuông cân";
    }

    if (isRight) {
        return "Tam giác vuông";
    }

    if (isIsosceles) {
        return "Tam giác cân";
    } else {
        return "Tam giác thường";
    }
}

console.log(classifyTriangle(0, 4, 5));
//  → "Cạnh không hợp lệ"

console.log(classifyTriangle(1, 2, 10));
//  → "Không tạo thành tam giác"

console.log(classifyTriangle(2, 2, 2));
//  → "Tam giác đều"

console.log(classifyTriangle(2, 2, 3));
//  → "Tam giác cân"

console.log(classifyTriangle(3, 4, 5));
//  → "Tam giác vuông"
