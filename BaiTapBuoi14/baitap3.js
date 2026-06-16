function classifyUser(user) {
    let displayName = user.name || "Ẩn danh";
    let isAdult = user.age >= 18;
    let hasEmail = user.email !== "";
    let role = user.role ?? "guest";

    let status;

    if (user.score >= 80) {
        status = "vip";
    } else if (user.score >= 50) {
        status = "normal";
    } else {
        status = "new";
    }

    let canAccess = isAdult && role !== "guest";

    return {
        displayName,
        isAdult,
        hasEmail,
        role,
        status,
        canAccess,
    };
}

console.log(classifyUser({ name: "An", age: 17, email: "", score: 0, role: null }));
// {
//   displayName: "Ẩn danh",  // name = "" là falsy
//   isAdult: false,
//   hasEmail: false,
//   role: "guest",
//   status: "new",
//   canAccess: false
// }

console.log(classifyUser({ name: "Bình", age: 22, email: "binh@gmail.com", score: 85, role: "admin" }));
// {
//   displayName: "Bình",
//   isAdult: true,
//   hasEmail: true,
//   role: "admin",
//   status: "vip",
//   canAccess: true
// }

console.log(classifyUser({ name: "Chi", age: 20, email: "chi@gmail.com", score: 55, role: undefined }));
// {
//   displayName: "Chi",
//   isAdult: true,
//   hasEmail: true,
//   role: "guest",
//   status: "normal",
//   canAccess: false
// }


console.log(classifyUser({ name: "", age: 30, email: "", score: 80, role: "member" }));
// {
//   displayName: "Ẩn danh",
//   isAdult: true,
//   hasEmail: false,
//   role: "member",
//   status: "vip",
//   canAccess: true
// }

console.log(classifyUser({ name: "Duy", age: 16, email: "duy@gmail.com", score: 90, role: "admin" }));
// {
//   displayName: "Duy",
//   isAdult: false,
//   hasEmail: true,
//   role: "admin",
//   status: "vip",
//   canAccess: false   <- chưa đủ 18 dù là admin
// }