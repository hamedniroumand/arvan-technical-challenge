import {changeRegisterFormToResponsiveMode} from "./home-modules/registration-form";
import {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider,
    mountSuccessProjectsSlider
} from "./home-modules/responsive-sliders"
import {onMouseHover} from "./home-modules/header";
import httpService from "./services/httpService";
import Validation from "./services/validation";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

changeRegisterFormToResponsiveMode(currentWindowWidth);


const onPageLoaded = () => {
    mountProjectsResponsiveSlider(currentWindowWidth);
    mountMeetingResponsiveSlider(currentWindowWidth)
    mountSuccessProjectsSlider(currentWindowWidth)
}

document.addEventListener('DOMContentLoaded', onPageLoaded);

window.addEventListener("resize", (e) => {
    const windowWidth = window.innerWidth;

    changeRegisterFormToResponsiveMode(windowWidth);
    mountProjectsResponsiveSlider(windowWidth);
    mountMeetingResponsiveSlider(windowWidth);
    mountSuccessProjectsSlider(windowWidth);
})

const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');

header.addEventListener("mousemove", (event) => {
    onMouseHover(event, front, back)
});

const form = document.querySelector("form");
const nameInput = form.querySelector("input[id='name']");
const phoneInput = form.querySelector("input[id='phone']");
const emailInput = form.querySelector("input[id='email']");
const resumeInput = form.querySelector("input[id='resume']");
const portfolioInput = form.querySelector("input[id='portfolio']");
const companyInput = form.querySelector("input[id='company']");
const descriptionInput = form.querySelector("textarea[id='description']");
const typeInput = form.querySelector("input[name='type']:checked");
const levelInput = form.querySelector("input[name='level']:checked");
const submitBtn = form.querySelector("button[type='submit']");

const requiredValidation = new Validation({
    required: [{input: nameInput}, {input: phoneInput}, {input: emailInput}, {input: resumeInput}]
}, (result) => {
    if (result.status) {
        if (submitBtn.hasAttribute("disabled")) {
            submitBtn.removeAttribute("disabled")
        }
    } else {
        if (!submitBtn.hasAttribute("disabled")) {
            submitBtn.setAttribute("disabled", "disabled")
        }
    }
});

const otherValidation = new Validation({
    numbers: [{input: phoneInput}],
    emails: [{input: emailInput}],
    files: [
        {input: resumeInput, mimeTypes: ['application/pdf'], minSize: false, maxSize: 1024 * 1024},
        {input: portfolioInput, mimeTypes: ['application/pdf'], minSize: false, maxSize: 1024 * 1024},
    ],
    minLengths: [
        {input: nameInput, length: 3},
        {input: phoneInput, length: 10},
    ],
    maxLengths: [
        {input: nameInput, length: 250},
        {input: phoneInput, length: 13},
    ]
}, () => {
    hamed()
}, false);

requiredValidation.validate();

form.addEventListener("submit", (event) => {
    event.preventDefault();


    otherValidation.clearInvalidClass()
    const result = otherValidation.validate()

    const formResult = document.querySelector('.form-result');

    if(result.status) {
        const httpResult = storeData();
        httpResult.then(success => {
            formResult.classList.remove("form-result-error")
            formResult.classList.add("form-result-success")
            formResult.innerHTML = `
            <ul>
                 <li>درخواست شما با موفقیت ثبت گردید</li>
            </ul>`
        })
    } else {
        let html = '';
        for (const errorsKey in result.errors) {
            form.querySelector(`#${errorsKey}`).classList.add("invalid")
            html += '<ul>'
            result.errors[errorsKey].forEach(err => {
                html += `<li>${err}</li>`
            });
        }
        html += '</ul>'
        formResult.innerHTML = html;
        formResult.classList.add("form-result-error")
        formResult.classList.remove("form-result-success")
    }
})

const storeData = () => {
    const DOC_ID = "8xnvXH97O2";
    const TABLE_ID = "grid-ldfgyo_r1s"
    form.querySelector("button[type='submit']").setAttribute("disabled", "disabled");

    const body = {
        "rows": [
            {
                "cells": [
                    {
                        "column": "name",
                        "value": nameInput.value.trim()
                    }, {
                        "column": "phone",
                        "value": phoneInput.value
                    }, {
                        "column": "email",
                        "value": emailInput.value
                    }, {
                        "column": "company",
                        "value": companyInput ? companyInput.value : ""
                    }, {
                        "column": "type",
                        "value": typeInput ? typeInput.value : ""
                    }, {
                        "column": "level",
                        "value": levelInput ? levelInput.value : ""
                    }, {
                        "column": "description",
                        "value": descriptionInput ? descriptionInput.value : ""
                    }
                ]
            }
        ]
    };

    const http = new httpService(`docs/${DOC_ID}/tables/${TABLE_ID}/rows`);
    return http.post(body)
        .then(response => {
            if (response.status) {
                return true
            }
        })
        .catch(err => false);
}
