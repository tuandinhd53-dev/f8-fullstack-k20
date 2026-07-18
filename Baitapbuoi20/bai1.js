const baseProto = {
    introduce() {
        return `Tôi là ${this.name}, ${this.age} tuổi`;
    },
};

const levelTwoProto = Object.create(baseProto);

levelTwoProto.getInfo = function () {
    return `${this.name} làm ở phòng ${this.department}, lương ${this.salary}`;
};

const item1 = Object.create(levelTwoProto);

item1.name = `Đinh Văn Tuấn`;
item1.age = 20;
item1.department = `IT`;
item1.salary = 1000;

const item2 = Object.create(levelTwoProto);
item2.name = "Tuấn";
item2.age = 26;
item2.department = "HR";
item2.salary = 1200;

const item3 = Object.create(levelTwoProto);
item3.name = "Văn Tuấn";
item3.age = 30;
item3.department = "IT";
item3.salary = 1800;

const item4 = Object.create(levelTwoProto);
item4.name = "Đình";
item4.age = 35;
item4.department = "Marketing";
item4.salary = 1700;

const item5 = Object.create(levelTwoProto);
item5.name = "Đình Tuấn";
item5.age = 24;
item5.department = "HR";
item5.salary = 1100;

console.log(item1.introduce());
console.log(item1.getInfo());

function checkOwnProperty(obj, key) {
    return Object.hasOwn(obj, key);
}

console.log(checkOwnProperty(item1, "name"));
// true

console.log(checkOwnProperty(item1, "introduce"));
// false
console.log(Object.getPrototypeOf(item1) === levelTwoProto);
console.log(Object.getPrototypeOf(levelTwoProto) === baseProto);

const newProto = {
    getInfo() {
        return `Bé ${this.name} là vua`;
    },
};

Object.setPrototypeOf(item4, newProto);
console.log(item4.getInfo());

console.log(Object.getOwnPropertyNames(item1));
console.log(Object.getOwnPropertyDescriptor(item1, "salary"));

Object.seal(item2);

item2.bonus = 10000;
console.log(item2.bonus);

item2.salary = 2000;

console.log(item2.salary);

console.log(Object.isSealed(item2));

const items = [item1, item2, item3, item4, item5];

const grouped = Object.groupBy(items, (item) => item.department);

console.log(grouped);

const lookup = Object.fromEntries([
    ["A001", "Nguyễn Văn A"],
    ["A002", "Trần Thị B"],
]);

console.log(lookup);
// { A001: "...", A002: "..." }

console.log(lookup["A002"]);
// Trần Thị B
