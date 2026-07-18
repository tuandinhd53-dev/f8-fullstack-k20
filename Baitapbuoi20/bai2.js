const config = {
    name: "Bé Đình",
    age: 20,
    game: "Delta Force",
    fee: 120000,
};

Object.freeze(config);

config.name = "Tun";
config.age = 1;
config.game = "Liên Quân";
config.fee = 0.5;

console.log(config.fee);
console.log(Object.isFrozen(config));

class MyClass {
    constructor(name) {
        this.name = name;
        this.items = [];
        this._discountPercent = 0;

        Object.defineProperty(this, "id", {
            value: "A001",
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }

    addItem(name, price, quantity) {
        this.items.push({
            name,
            price,
            quantity,
        });
    }

    get total() {
        const total = this.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        const totalWithFee = total + config.fee;

        const finalTotal =
            (totalWithFee * (100 - this._discountPercent)) / 100;

        return finalTotal;
    }

    set discountPercent(value) {
        if (value >= 0 && value <= 100) {
            this._discountPercent = value;
        } else {
            throw new Error("Discount phải từ 0 đến 100");
        }
    }
}

function logSummary() {
    console.log(`${this.name}: ${this.total}`);
}

const instance = new MyClass("Danh sách của An");

instance.addItem("Bàn phím", 500000, 2);
instance.addItem("Chuột", 200000, 1);

console.log(instance.total);

instance.discountPercent = 10;
console.log(instance.total);

try {
    instance.discountPercent = 150;
} catch (e) {
    console.log(e.message);
}

setTimeout(logSummary.bind(instance), 100);

console.log(Object.keys(instance));

instance.id = "hack123";
console.log(instance.id);

delete instance.id;
console.log(instance.id);

const objA = {
    name: "Tuấn",
    age: 20,
    city: "Vĩnh Phúc",
};

const objB = {
    age: 21,
    job: "Developer",
};

const merged = Object.assign({}, objA, objB);

console.log(merged);
console.log(objA);
console.log(objB);