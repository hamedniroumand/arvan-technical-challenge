import {changeRegisterFormToResponsiveMode, setSelectsInputValue, requiredValidation } from "@/home-modules/registration-form";
import {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider,
    mountSuccessProjectsSlider
} from "@/home-modules/responsive-sliders"
import "@/home-modules/header";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

changeRegisterFormToResponsiveMode(currentWindowWidth);

// Listeners Handlers
const onPageLoaded = () => {
    mountProjectsResponsiveSlider(currentWindowWidth);
    mountMeetingResponsiveSlider(currentWindowWidth)
    mountSuccessProjectsSlider(currentWindowWidth)
    setSelectsInputValue()
}

const windowOnResize = (e) => {
    const windowWidth = window.innerWidth;

    changeRegisterFormToResponsiveMode(windowWidth);
    mountProjectsResponsiveSlider(windowWidth);
    mountMeetingResponsiveSlider(windowWidth);
    mountSuccessProjectsSlider(windowWidth);
}

// Listeneres
document.addEventListener('DOMContentLoaded', onPageLoaded);
window.addEventListener("resize", windowOnResize)

requiredValidation.validate();