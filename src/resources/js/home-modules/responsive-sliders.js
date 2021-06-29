import Splide from "@splidejs/splide";
import {breakPoints} from "./registration-form";

const mountSliders = (width, sliderSelector, breakPoint, elementToHidden, elementToShow, sliderOption) => {
    if (width < breakPoint) {
        if(document.querySelector(elementToHidden).style.display === "none" && document.querySelector(elementToShow).style.display === "block") return;
        document.querySelector(elementToHidden).style.display = "none";
        document.querySelector(elementToShow).style.display = "block";
        new Splide(sliderSelector, sliderOption).mount();
    } else {
        if(document.querySelector(elementToHidden).style.display === "block" && document.querySelector(elementToShow).style.display === "none") return;
        document.querySelector(elementToHidden).style.display = "block";
        document.querySelector(elementToShow).style.display = "none";
    }
}

const mountProjectsResponsiveSlider = (currentWindowWidth) => {
    (() => {
        const projectsResponsiveSliderOption = {
            direction: "rtl",
            perPage: 2,
            arrows: false,
            autoWidth: true,
            pagination: false
        }
        mountSliders(currentWindowWidth, "#project-tab-mobile", breakPoints.sm, ".projects .tabs", ".project-tabs-mobile", projectsResponsiveSliderOption);
    })()
}

const mountMeetingResponsiveSlider = (currentWindowWidth) => {
    (() => {
        const meetingResponsiveSliderOption = {
            direction: "rtl",
            perPage: 1,
            arrows: false,
            autoWidth: true,
            pagination: false,
        }
        mountSliders(currentWindowWidth, "#meeting-tab-mobile", breakPoints.sm, ".meeting-structure .tabs", "#meeting-tab-mobile", meetingResponsiveSliderOption);
    })()
}


export {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider
}