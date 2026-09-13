const toastElement = document.querySelector("#toast");
const toastMessageElement = document.querySelector("#toast-message");

const showToast = (message) => {
    toastMessageElement.textContent = message;
    toastElement.classList.remove("hidden");
    setTimeout(() => {
        toastElement.classList.add("hidden");
    }, 2000);
};

export { showToast };
