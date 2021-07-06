const breakPoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}

const renderStatus = (messages, formResultSelector, success = false) => {
    const formResult = document.querySelector(formResultSelector);
    if (success) {
        formResult.classList.remove("form-result-error")
        formResult.classList.add("form-result-success")
    } else {
        formResult.classList.add("form-result-error")
        formResult.classList.remove("form-result-success")
    }

    let html = "<ul>";
    messages.forEach(error => {
        html += `<li>${error}</li>`
    });
    html += "</ul>";

    formResult.innerHTML = html;
}

export {
    breakPoints,
    renderStatus
}