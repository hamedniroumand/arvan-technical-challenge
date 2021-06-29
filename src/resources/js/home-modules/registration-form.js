const breakPoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}

const toggleDisplay = (elements, display, isSingle = false) => {
    if(isSingle) {
        if(elements.style.display === display) return;
        elements.style.display = display;
    } else {
        if(Array.from(elements)[0].style.display === display) return;
        Array.from(elements).forEach(el => {
            el.style.display = display;
        })
    }
}


const responsiveMode = (currentWindowWidth) => {

    const labels = document.querySelectorAll(".select-group > .label");

    if(currentWindowWidth <= breakPoints.sm) {
        toggleDisplay(labels, "none");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === label.innerHTML) return;
            selectGroup.querySelector(".custom-select p").innerHTML = label.innerHTML
        })

    } else {
        toggleDisplay(labels, "block");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === "") return;
            selectGroup.querySelector(".custom-select p").innerHTML = ""
        })
    }
}

export {
    responsiveMode,
    breakPoints
}
