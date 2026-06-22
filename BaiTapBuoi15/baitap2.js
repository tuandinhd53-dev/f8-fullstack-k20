let n = 20;

//  Kiểm tra số nguyên tố

function isPrime(n) {
    if (n < 2) return false;
    for (let k = 2; k < n; k++) {
        if (n % k === 0) return false;
    }

    return true;
}

// Duyệt từng dòng

for (let i = 1; i <= n; i++) {
    let line = "";

    // // Duyệt từng số trong dòng

    for (let j = 1; j <= i; j++) {
        let value;

        // // Xác định giá trị cần in

        if (j % 3 === 0 && j % 5 === 0) {
            value = "#";
        } else if (isPrime(j)) {
            value = "*";
        } else {
            value = j;
        }

        line += value + " ";
    }

    console.log(line);

    // Kiểm tra dòng chẵn để thêm dấu -

    if (i % 2 === 0) {
        let separator = "";

        for (let m = 1; m <= i; m++) {
            separator += "-";
        }

        console.log(separator);
    }
}
