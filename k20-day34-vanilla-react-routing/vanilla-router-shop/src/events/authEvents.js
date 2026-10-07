const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showError = (form, field, message) => {
    const error = form.querySelector(`[data-error="${field}"]`);

    if (!error) return;

    error.textContent = message;
    error.classList.remove("hidden");
};

const clearErrors = (form) => {
    form.querySelectorAll("[data-error]").forEach((error) => {
        error.textContent = "";
        error.classList.add("hidden");
    });
};

const validateSignIn = (form) => {
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let isValid = true;

    if (!email) {
        showError(form, "email", "Vui lòng nhập email.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(form, "email", "Email không hợp lệ.");
        isValid = false;
    }

    if (!password) {
        showError(form, "password", "Vui lòng nhập mật khẩu.");
        isValid = false;
    } else if (password.length < 8) {
        showError(form, "password", "Mật khẩu phải có ít nhất 8 ký tự.");
        isValid = false;
    }

    return isValid;
};

const validateSignUp = (form) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const terms = form.terms.checked;

    let isValid = true;

    if (!name) {
        showError(form, "name", "Vui lòng nhập họ và tên.");
        isValid = false;
    }

    if (!email) {
        showError(form, "email", "Vui lòng nhập email.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(form, "email", "Email không hợp lệ.");
        isValid = false;
    }

    if (!password) {
        showError(form, "password", "Vui lòng nhập mật khẩu.");
        isValid = false;
    } else if (password.length < 8) {
        showError(form, "password", "Mật khẩu phải có ít nhất 8 ký tự.");
        isValid = false;
    }

    if (!confirmPassword) {
        showError(form, "confirmPassword", "Vui lòng xác nhận mật khẩu.");
        isValid = false;
    } else if (confirmPassword !== password) {
        showError(form, "confirmPassword", "Mật khẩu xác nhận không khớp.");
        isValid = false;
    }

    if (!terms) {
        showError(form, "terms", "Bạn cần đồng ý với điều khoản.");
        isValid = false;
    }

    return isValid;
};

document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-auth-form]");

    if (!form) return;

    e.preventDefault();

    clearErrors(form);

    const formType = form.dataset.authForm;

    let isValid = false;

    if (formType === "sign-in") {
        isValid = validateSignIn(form);
    }

    if (formType === "sign-up") {
        isValid = validateSignUp(form);
    }

    if (!isValid) return;

    alert(formType === "sign-in" ? "Đăng nhập hợp lệ!" : "Đăng ký hợp lệ!");
});
