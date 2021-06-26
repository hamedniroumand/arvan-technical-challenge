require("svg-url-loader!../../public/images/city.svg")
require("svg-url-loader!../../public/images/city-back.svg")

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

        const id = element.getAttribute("id");
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






