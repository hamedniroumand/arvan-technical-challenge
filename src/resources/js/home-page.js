import Splide from "@splidejs/splide"
import {responsiveMode, breakPoints} from "./home-modules/registration-form";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

responsiveMode(currentWindowWidth);


const onPageLoaded = () => {
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

        document.querySelector(".success-projects-slider").classList.remove("splide")
    }
    else {
        new Splide('#success-projects-slider', {
            direction: "rtl",
            perPage: 7,
            pagination: false,
        }).mount();
    }
}

document.addEventListener( 'DOMContentLoaded', onPageLoaded);

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


