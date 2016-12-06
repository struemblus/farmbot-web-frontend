let createToast = (title: string, message: string) => {
    /** Get container */
    let tc = document.querySelector(".toast-container");

    /** Create necessary elements */
    let toastEl = document.createElement("div");
    let titleEl = document.createElement("h4");
    let messageEl = document.createElement("div");
    let loaderEl = document.createElement("div");
    let leftLoaderEl = document.createElement("div");
    let rightLoaderEl = document.createElement("div");
    let spinnerLoaderEl = document.createElement("div");

    /** Fill the contents */
    titleEl.innerText = title;
    messageEl.innerText = message;

    /** Add the classes */
    toastEl.classList.add("toast");
    titleEl.classList.add("toast-title");
    messageEl.classList.add("toast-message");
    loaderEl.classList.add("toast-loader");
    leftLoaderEl.classList.add("toast-loader-right");
    rightLoaderEl.classList.add("toast-loader-left");
    spinnerLoaderEl.classList.add("toast-loader-spinner");

    /** Add events */
    toastEl.addEventListener("click", function (e: any) {
        tc.removeChild(e.currentTarget);
    });
    toastEl.addEventListener("mouseenter", function (e: any) {
        let children = e.currentTarget.children[2].children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.animationPlayState = "paused";
        }
    });
    toastEl.addEventListener("mouseleave", function (e: any) {
        let children = e.currentTarget.children[2].children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.animationPlayState = "running";
        }
    });

    /** Append the children */
    loaderEl.appendChild(leftLoaderEl);
    loaderEl.appendChild(rightLoaderEl);
    loaderEl.appendChild(spinnerLoaderEl);
    toastEl.appendChild(titleEl);
    toastEl.appendChild(messageEl);
    toastEl.appendChild(loaderEl);
    tc.appendChild(toastEl);
};

export function init() {
    /** Create container and append it */
    let toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container");
    document.body.appendChild(toastContainer);

    /** Stubbed events */
    createToast("Title", "Message");
    createToast("Title2", "Message");
    createToast("Title3", "Message");
    createToast("Title4", "Message");
}
