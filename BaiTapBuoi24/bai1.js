class InvalidTypeError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "InvalidTypeError";
        this.field = field;
    }
}

class OutOfRangeError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "OutOfRangeError";
        this.field = field;
    }
}

class InvalidEmailError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "InvalidEmailError";
        this.field = field;
    }
}

class WeakPasswordError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "WeakPasswordError";
        this.field = field;
    }
}

function registerUser(user) {
    if (user === undefined) {
        throw new InvalidTypeError("Phải truyền vào một object.", "user");
    }
    if (typeof user !== "object" || user === null || Array.isArray(user)) {
        throw new InvalidTypeError("Dữ liệu phải là object.", "user");
    }

    if (typeof user.username !== "string") {
        throw new InvalidTypeError("Username phải là chuỗi.", "username");
    }
    if (typeof user.age !== "number") {
        throw new InvalidTypeError("Age phải là number.", "age");
    }
    if (user.age < 13 || user.age > 120) {
        throw new OutOfRangeError("Age phải nằm trong khoảng 13 - 120.", "age");
    }

    if (typeof user.email !== "string") {
        throw new InvalidTypeError("Email phải là chuỗi.", "email");
    }
    if (!user.email.includes("@")) {
        throw new InvalidEmailError("Email không hợp lệ.", "email");
    }

    if (typeof user.password !== "string") {
        throw new InvalidTypeError("Password phải là chuỗi.", "password");
    }
    if (user.password.length < 8) {
        throw new WeakPasswordError(
            "Password phải có ít nhất 8 ký tự.",
            "password",
        );
    }
    return {
        success: true,
        message: "Đăng ký thành công",
    };
}

try {
    const result = registerUser({
        username: "an",
        age: 20,
        email: "a@b.com",
        password: "12345678",
    });
    console.log(result);
} catch (error) {
    if (error instanceof InvalidTypeError) {
        console.log("Lỗi sai kiểu dữ liệu");
    } else if (error instanceof OutOfRangeError) {
        console.log("Lỗi vượt phạm vi");
    } else if (error instanceof InvalidEmailError) {
        console.log("Lỗi email không hợp lệ");
    } else if (error instanceof WeakPasswordError) {
        console.log("Lỗi mật khẩu quá ngắn");
    } else {
        console.log("Lỗi không xác định");
    }
} finally {
    console.log("Quá trình xử lý đăng ký đã kết thúc.");
}
