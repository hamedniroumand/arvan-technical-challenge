const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');


header.addEventListener("mousemove", (event) => {
    onMouseHover(event, front, back)
});

const onMouseHover = (event, front, back) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const finalX = clientX / 100;
    const finalY = clientY / 45;

    front.style.backgroundPositionX = `-${finalX}px`;
    front.style.backgroundPositionY = `${finalY}px`;
    back.style.backgroundPositionX = `${finalX}px`;
}

export {
    onMouseHover
}
