import Splide from "@splidejs/splide"
import {changeRegisterFormToResponsiveMode, breakPoints} from "./home-modules/registration-form";
import {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider
} from "./home-modules/responsive-sliders"
import {onMouseHover} from "./home-modules/header";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

changeRegisterFormToResponsiveMode(currentWindowWidth);


const onPageLoaded = () => {

    mountProjectsResponsiveSlider(currentWindowWidth);
    mountMeetingResponsiveSlider(currentWindowWidth)

    if(currentWindowWidth < breakPoints.sm) {
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
    const windowWidth = window.innerWidth;

    changeRegisterFormToResponsiveMode(windowWidth);
    mountProjectsResponsiveSlider(windowWidth);
    mountMeetingResponsiveSlider(windowWidth)
})

const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');

header.addEventListener("mousemove", (event) => {
    onMouseHover(event, front, back)
});


