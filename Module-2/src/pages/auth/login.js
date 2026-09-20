import "../../assets/style.css";

// logic login...

const BASE_URL = "https://spotify.f8team.dev";

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const forgotPassword = document.querySelector("#forgot-password");

// Message
const loginError = document.querySelector("#login-error");
const loginSuccess = document.querySelector("#login-success");

// Loading + Button
const loginLoading = document.querySelector("#login-loading");
const loginButton = document.querySelector("#login-button");
const loginButtonText = document.querySelector("#login-button-text");

// Error
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const errorElements = [emailError, passwordError, loginError];

// FielMap
const fieldMap = {
    email: {
        input: emailInput,
        error: emailError,
    },
    password: {
        input: passwordInput,
        error: passwordError,
    },
};

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Event Submit
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Input Value
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Cleal Errors Submit
    clealErrors();
    loginSuccess.classList.add("hidden");

    let isValid = true;

    // Email
    if (email === "") {
        showError(emailError, "Email is required.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(emailError, "Please enter a valid email address.");
        isValid = false;
    }

    // Password
    if (password === "") {
        showError(passwordError, "Password is required.");
        isValid = false;
    }

    // Stop if validation failed
    if (!isValid) {
        return;
    }

    // Loading On
    setLoading(true);

    // Form
    const form = {
        email,
        password,
    };

    try {
        // API REQUEST

        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        // API Error

        if (!res.ok) {
            const dataError = await res.json();
            handleLoginError(dataError.error);
            return;
        }

        // API Success
        const data = await res.json();

        // Save tokens
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // Success Login
        loginSuccess.classList.remove("hidden");
        loginSuccess.textContent = data.message;

        // Redirect to Home

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1500);
    } catch (error) {
        showError(loginError, "Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
});

// ShowError

function showError(element, message) {
    element.classList.remove("hidden");
    element.textContent = message;
}

// ClealError Submit
function clealErrors() {
    errorElements.forEach((error) => {
        error.classList.add("hidden");
        error.textContent = "";
    });
}

//  API ERROR HANDLER

function handleLoginError(error) {
    if (error.code === "INVALID_CREDENTIALS") {
        showError(loginError, error.message);
        return;
    }
}

// Is Loading
function setLoading(isLoading) {
    loginButton.disabled = isLoading;

    if (isLoading) {
        loginButtonText.textContent = "Logging in...";
        loginLoading.classList.remove("hidden");
    } else {
        loginButtonText.textContent = "Log in";
        loginLoading.classList.add("hidden");
    }
}
