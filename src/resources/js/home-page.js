require("svg-url-loader!../../public/images/city.svg")

const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');

header.addEventListener("mousemove", (event) => {
    const clientX = event.clientX; // 1600px
    const clientY = event.clientY;

    const finalX = clientX / 100;
    const finalY = clientY / 45;

    if(!front) return;

    front.style.backgroundPositionX = `-${finalX}px`;
    front.style.backgroundPositionY = `${finalY}px`;
    back.style.backgroundPositionX = `${finalX*2}px`;
})
