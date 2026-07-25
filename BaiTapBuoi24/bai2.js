class BankAccount {
    static totalMoney = 0;
    #balance;
    constructor(ownerName, balance) {
        if (typeof balance !== "number" || balance < 0) {
            throw new Error("Số dư phải là số và không được nhỏ hơn 0.");
        }

        this.ownerName = ownerName;
        this.#balance = balance;
        BankAccount.totalMoney += balance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Số tiền nạp phải lớn hơn 0.");
        }
        this.#balance += amount;
    }

    withdraw(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Số tiền rút phải là số và lớn hơn 0.");
        }

        if (amount > this.#balance) {
            throw new Error("Không đủ số dư.");
        }
        this.#balance -= amount;
    }

    toString() {
        return `Chủ tài khoản: ${this.ownerName}
Số dư: ${this.balance}`;
    }
}

class SavingsAccount extends BankAccount {
    constructor(ownerName, balance, interestRate) {
        super(ownerName, balance);
        this.interestRate = interestRate;
    }

    addInterest() {
        const interest = this.balance * this.interestRate;

        this.deposit(interest);
    }

    withdraw(amount) {
        if (amount > this.balance / 2) {
            throw new Error("Không được rút quá 50% số dư.");
        }

        super.withdraw(amount);
    }
}

// Test
try {
    new BankAccount("An", -100);
} catch (error) {
    console.log(error.message);
}

try {
    const account = new BankAccount("An", 500000);

    account.deposit("100");
} catch (error) {
    console.log(error.message);
}

try {
    const account = new BankAccount("An", 500000);

    account.withdraw(700000);
} catch (error) {
    console.log(error.message);
}

try {
    const account = new SavingsAccount("Bình", 1000000, 0.05);

    account.addInterest();

    console.log(account.toString());
} catch (error) {
    console.log(error.message);
}

try {
    const account = new SavingsAccount("Bình", 1000000, 0.05);

    account.withdraw(600000);
} catch (error) {
    console.log(error.message);
}

try {
    const account = new SavingsAccount("Bình", 1000000, 0.05);

    account.withdraw(400000);

    console.log(account.toString());
} catch (error) {
    console.log(error.message);
}

console.log("Tổng số dư ban đầu:", BankAccount.totalMoney);
