const BASE_URL = "https://spotify.f8team.dev";

const registerForm = document.querySelector("#register-form");

// Inputs
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const displayNameInput = document.querySelector("#display-name");
const bioInput = document.querySelector("#bio");
const countryInput = document.querySelector("#country");

// Button
const registerButton = document.querySelector("#register-button");
const registerButtonText = document.querySelector("#register-button-text");
const registerLoading = document.querySelector("#register-loading");

// Message
const registerSuccess = document.querySelector("#register-success");
const registerError = document.querySelector("#register-error");

// Error

const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const displayNameError = document.querySelector("#display-name-error");
const bioError = document.querySelector("#bio-error");
const countryError = document.querySelector("#country-error");

const errorElements = [
    usernameError,
    emailError,
    passwordError,
    displayNameError,
    bioError,
    countryError,
    registerError,
];

// Field Map
const fieldMap = {
    username: {
        input: usernameInput,
        error: usernameError,
    },
    email: {
        input: emailInput,
        error: emailError,
    },
    password: {
        input: passwordInput,
        error: passwordError,
    },
    display_name: {
        input: displayNameInput,
        error: displayNameError,
    },

    bio: {
        input: bioInput,
        error: bioError,
    },

    country: {
        input: countryInput,
        error: countryError,
    },
};

// Regex
const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Object.values(fieldMap).forEach(({ input, error }) => {
    input.addEventListener("input", () => {
        clearInputError(input, error);
    });
});

// Submit Form
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const displayName = displayNameInput.value.trim();
    const bio = bioInput.value.trim();
    const country = countryInput.value.trim();

    // Reset previous errors
    clearErrors();
    clearInputErrors();

    // Hide success message
    registerSuccess.classList.add("hidden");

    let isValid = true;

    // Username
    if (username === "") {
        showError(usernameError, "Username is required.");
        showInputError(usernameInput);
        isValid = false;
    } else if (!usernameRegex.test(username)) {
        showError(
            usernameError,
            "Username must contain only alphanumeric characters.",
        );
        showInputError(usernameInput);
        isValid = false;
    }

    // Email
    if (email === "") {
        showError(emailError, "Email is required.");
        showInputError(emailInput);
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(emailError, "Please enter a valid email address.");
        showInputError(emailInput);
        isValid = false;
    }

    // Password
    if (password === "") {
        showError(passwordError, "Password is required.");
        showInputError(passwordInput);
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError(
            passwordError,
            "Password must be at least 6 characters and contain uppercase, lowercase, and a number.",
        );
        showInputError(passwordInput);
        isValid = false;
    }

    // Display Name
    if (displayName === "") {
        showError(displayNameError, "Display name is required.");
        showInputError(displayNameInput);
        isValid = false;
    }

    // Bio
    if (bio === "") {
        showError(bioError, "Bio is required.");
        showInputError(bioInput);
        isValid = false;
    }

    // Country
    if (country === "") {
        showError(countryError, "Country is required.");
        showInputError(countryInput);
        isValid = false;
    }

    // Stop if validation failed
    if (!isValid) {
        return;
    }

    // Loading ON
    setLoading(true);

    // Form data
    const form = {
        username,
        email,
        password,
        display_name: displayName,
        bio,
        country,
    };

    try {
        // API REQUEST
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        // API Error
        if (!res.ok) {
            const errorData = await res.json();
            handleRegisterError(errorData.error);
            return;
        }

        // API Success
        const data = await res.json();

        // Save tokens
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // Success message
        registerSuccess.classList.remove("hidden");
        registerSuccess.textContent = data.message;

        // Redirect to Login

        setTimeout(() => {
            window.location.href = "./login.html";
        }, 1500);
    } catch (error) {
        showError(registerError, "Something went wrong. Please try again.");
    } finally {
        // Loading OFF

        setLoading(false);
    }
});

// Show Error
function showError(element, message) {
    element.classList.remove("hidden");
    element.textContent = message;
}

// Show Input Error
function showInputError(input) {
    input.classList.remove("border-[#727272]");
    input.classList.add("border-red-500");
}

// Clear ALL Errors
function clearErrors() {
    errorElements.forEach((error) => {
        error.classList.add("hidden");
        error.textContent = "";
    });
}

// Clear Input Errors
function clearInputErrors() {
    Object.values(fieldMap).forEach(({ input }) => {
        input.classList.remove("border-red-500");
        input.classList.add("border-[#727272]");
    });
}

// Clear One Input Error
function clearInputError(input, error) {
    input.classList.remove("border-red-500");
    input.classList.add("border-[#727272]");

    error.classList.add("hidden");
    error.textContent = "";
}

//  API ERROR HANDLER

function handleRegisterError(error) {
    if (error.code === "VALIDATION_ERROR") {
        error.details.forEach((e) => {
            const field = fieldMap[e.field];
            if (!field) {
                return;
            }

            showError(field.error, e.message);
            showInputError(field.input);
        });
        return;
    }

    // Email already exists
    if (error.code === "EMAIL_EXISTS") {
        showError(emailError, error.message);
        showInputError(emailInput);

        return;
    }
    // Unknown API error
    showError(registerError, error.message);
}

// Loading

function setLoading(isLoading) {
    registerButton.disabled = isLoading;

    if (isLoading) {
        registerButtonText.textContent = "Signing up...";
        registerLoading.classList.remove("hidden");
    } else {
        registerButtonText.textContent = "Sign up";
        registerLoading.classList.add("hidden");
    }
}
