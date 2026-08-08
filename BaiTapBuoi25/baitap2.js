const form = document.querySelector("#register-form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password-error");
const submitBtn = document.querySelector("#submit-btn");

// Kiểm tra Tên đăng nhập
const usernameRegex = /^[a-zA-Z0-9_]+$/;

username.addEventListener("input", function () {
    if (username.value.length < 4) {
        usernameError.textContent = "Tên đăng nhập phải có ít nhất 4 ký tự";
    } else if (!usernameRegex.test(username.value)) {
        usernameError.textContent = "Tên đăng nhập phải đúng kí tự";
    } else {
        usernameError.textContent = "";
    }
    checkFormValid();
});

// Kiểm tra Email

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener("input", function () {
    if (!emailRegex.test(email.value)) {
        emailError.textContent = "Email phải đúng định dạng";
    } else {
        emailError.textContent = "";
    }
    checkFormValid();
});
// Kiểm tra Password
const numberRegex = /[0-9]/;
let confirmTouched = false;

password.addEventListener("input", function () {
    if (password.value.length < 8) {
        passwordError.textContent = "Mật khẩu ít hơn 8 kí tự";
    } else if (!numberRegex.test(password.value)) {
        passwordError.textContent = "Mật khẩu phải chứa ít nhất 1 chữ số";
    } else {
        passwordError.textContent = "";
    }

    validateConfirmPassword();
    checkFormValid();
});

// Hàm validate confirm password
function validateConfirmPassword() {
    if (!confirmTouched) {
        return;
    }
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "Mật khẩu không khớp!";
    } else {
        confirmPasswordError.textContent = "";
    }
}

// Kiểm tra Confirm Password

confirmPassword.addEventListener("input", function () {
    confirmTouched = true;
    validateConfirmPassword();
    checkFormValid();
});

// Kiểm tra nút Đăng kí
function checkFormValid() {
    const isUsernameValid =
        username.value.length >= 4 && usernameRegex.test(username.value);

    const isEmailValid = emailRegex.test(email.value);

    const isPasswordValid =
        password.value.length >= 8 && numberRegex.test(password.value);

    const isConfirmValid =
        confirmTouched && confirmPassword.value === password.value;

    const isFormValid =
        isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid;

    submitBtn.disabled = !isFormValid;
}

// Submit Form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = document.createElement("p");
    message.textContent = "Đăng ký thành công!";

    form.append(message);
});
