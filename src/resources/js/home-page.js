import Splide from "@splidejs/splide"
import {responsiveMode, breakPoints} from "./home-modules/registration-form";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

responsiveMode(currentWindowWidth);

document.addEventListener( 'DOMContentLoaded', function () {
    if(currentWindowWidth < breakPoints.sm) {
        document.querySelector(".projects .tabs").style.display = "none"
        document.querySelector(".project-tabs-mobile").style.display = "block"
        new Splide('#project-tab-mobile', {
            direction: "rtl",
            perPage: 2,
            arrows: false,
            autoWidth: true,
            pagination: false
        }).mount();

        document.querySelector(".meeting-structure .tabs").style.display = "none"
        document.querySelector("#meeting-tab-mobile").style.display = "block"
        new Splide('#meeting-tab-mobile', {
            direction: "rtl",
            perPage: 1,
            arrows: false,
            autoWidth: true,
            pagination: false,
        }).mount();
    }
});

window.addEventListener("resize", (e) => {
    responsiveMode(window.innerWidth)
})

const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');

header.addEventListener("mousemove", (event) => {
    if (!front) return;

    const clientX = event.clientX; // 1600px
    const clientY = event.clientY;

    const finalX = clientX / 100;
    const finalY = clientY / 45;

    front.style.backgroundPositionX = `-${finalX}px`;
    front.style.backgroundPositionY = `${finalY}px`;
    back.style.backgroundPositionX = `${finalX}px`;
});

var expandedIndex = [];

Array.from(document.querySelectorAll('.expand-description')).forEach((element, index) => {
    element.addEventListener("click", (event) => {
        const parentNode = event.target.closest('.project-item');
        if (!parentNode) return;

        const content = parentNode.querySelector('.project-item__content');
        if (!content) return;

        parentNode.querySelector('span.expand-description').classList.toggle('active');

        if (!parentNode.classList.contains('active')) {
            expandedIndex.push(index)
            content.style.maxHeight = "3000px";
            parentNode.classList.add('active');
        } else {
            expandedIndex = expandedIndex.filter((i) => i != index - 1);
            content.style.maxHeight = "0";
            setTimeout(() => {
                parentNode.classList.remove('active');
            }, 300)
        }
    });
});

Array.from(document.querySelectorAll(".tab")).forEach(element => {
    element.addEventListener("click", (event) => {
        const id = element.getAttribute("data-id");
        const type = element.getAttribute("data-type");
        const target = document.querySelector(`[data-target='#${id}'][data-type='${type}']`);
        const targetFamily = Array.from(document.querySelectorAll(`.tab-target[data-type='${type}']`))

        removeActiveClassFromTabFamily(type)
        event.target.closest('.tab').classList.add("active");

        targetFamily.forEach(family => {
            family.style.display = "none"
        });
        target.classList.add("active")
        target.style.display = "block"
    });
});

const removeActiveClassFromTabFamily = (type) => {
    Array.from(document.querySelectorAll(`.tab[data-type='${type}']`)).forEach(item => {
        item.classList.remove('active')
    });
}

document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach(customSelect => {
        customSelect.classList.remove("active")
    });
})

Array.from(document.querySelectorAll('.custom-select__item input')).forEach(element => {
    element.addEventListener('change', (e) => {
        e.target.closest('.custom-select').querySelector("p").innerHTML = e.target.nextSibling.nextElementSibling.innerHTML;
        e.target.closest('.custom-select').classList.remove('active')
    });
});

document.querySelectorAll(".custom-select").forEach(customSelect => {
    customSelect.addEventListener("click", (event) => {
        event.stopPropagation();
        if(!event.target.classList.contains('custom-select__item')) {
            event.target.closest(".custom-select").classList.toggle("active");
        }
    });
});

Array.from(document.querySelectorAll(".custom-file")).forEach(label => {
    label.nextSibling.nextElementSibling.addEventListener("change", event => {
        label.innerHTML = event.target.files[0].name;
        label.classList.add("selected")
    })
})

