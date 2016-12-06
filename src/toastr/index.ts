let lastMsg = "Prevent Annoying Duplicates";

let createToast = (message: string, title: string) => { };

// export function success(message: string, title = "Success") {
//     console.log(message, title);
// }

// // Warnings fire once, to avoid bombarding the user with repetitious errors
// // Eg: "Can"t connect to server!" might get repetitive.
// export function warning(message: string, title = "Warning") {
//     if (lastMsg === message) {
//         console.warn(message);
//     } else {
//         // toast.warning(message, title);
//     };
//     lastMsg = message;
// }

// // Errors can fire multiple times for situations such as password guessing
// export function error(message: string, title = "Error") {
//     // toast.error(message, title);
// }

export function init() {
    let toastContainer = document.createElement("DIV");
    toastContainer.classList.add("toast-container");
    document.body.appendChild(toastContainer);

    let toastElement = document.createElement("DIV");
    let titleElement = document.createElement("H4");
    let messageElement = document.createElement("DIV");
    let loaderElement = document.createElement("DIV");

    toastElement.classList.add("toast");
    titleElement.classList.add("toast-title");
    messageElement.classList.add("toast-message");
    loaderElement.classList.add("toast-loader");

    toastElement.appendChild(titleElement);
    toastElement.appendChild(messageElement);
    toastElement.appendChild(loaderElement);

    toastContainer.appendChild(toastElement);
}
