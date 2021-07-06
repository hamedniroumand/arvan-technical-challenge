import { breakPoints, renderStatus } from "@/helper";
import HttpService from "@/services/httpService";
import Validation from "@/services/validation";

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
        {input: phoneInput, length: 11},
    ],
    maxLengths: [
        {input: nameInput, length: 250},
        {input: companyInput, length: 250},
        {input: phoneInput, length: 11},
        {input: descriptionInput, length: 800},
    ]
}, () => {
}, false);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    otherValidation.clearInvalidClass()
    const result = otherValidation.validate()

    if (result.status) {
        const httpResult = storeData();
        httpResult
            .then(success => {
                renderStatus(['درخواست شما با موفقیت ثبت گردید'], '.form-result', true);
            }).catch(err => {
            console.log(err)
            renderStatus(['مشکلی در ثبت اطلاعات وجود دارد'], '.form-result', false);
        })
    } else {
        let errors = [];
        for (const errorsKey in result.errors) {
            form.querySelector(`#${errorsKey}`).classList.add("invalid")
            result.errors[errorsKey].forEach(err => {
                errors.push(err)
            });
        }
        renderStatus(errors, '.form-result', false)
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

    const http = new HttpService(`docs/${DOC_ID}/tables/${TABLE_ID}/rows`);
    return http.post(body)
        .then(response => {
            if (response.status === 202) return true
        })
        .catch(err => false);
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

const setSelectsInputValue = () => {
   const checkedType = document.querySelector("input[name='type']:checked");
   const checkedLevel = document.querySelector("input[name='level']:checked");

   if(checkedType) {
        checkedType.closest('.custom-select').querySelector('p').innerHTML = checkedType.nextSibling.nextSibling.innerHTML
   }
   if(checkedLevel) {
       checkedLevel.closest('.custom-select').querySelector('p').innerHTML = checkedLevel.nextSibling.nextSibling.innerHTML
   }
}

const changeRegisterFormToResponsiveMode = (currentWindowWidth) => {

    const labels = document.querySelectorAll(".select-group > .label");
    const fileLabels = document.querySelectorAll(".file-group .label");

    if(currentWindowWidth <= breakPoints.sm) {
        toggleDisplay(labels, "none");
        toggleDisplay(fileLabels, "none");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === label.innerHTML) return;
            selectGroup.querySelector(".custom-select p").innerHTML = label.innerHTML
        })

        Array.from(fileLabels).forEach(label => {
            label.parentNode.querySelector(".custom-file").innerHTML = label.innerHTML
        })

    } else {
        toggleDisplay(labels, "block");
        toggleDisplay(fileLabels, "block");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === "") return;
            selectGroup.querySelector(".custom-select p").innerHTML = ""
        })

        Array.from(fileLabels).forEach(label => { //optional
            const customFile = label.parentNode.querySelector(".custom-file")
            if(customFile.classList.contains("optional")) {
                customFile.innerHTML = "اختیاری"
            } else {
                customFile.innerHTML = ""
            }

        })
    }
}

export {
    changeRegisterFormToResponsiveMode,
    setSelectsInputValue,
    requiredValidation,
    otherValidation
}
