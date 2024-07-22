const slides = document.querySelector('.Slides');
const slide = document.querySelectorAll('.Slide');
const previousButton = document.querySelector('.Previous');
const nextButton = document.querySelector('.Next');
const itemButtons = document.querySelectorAll('.ItemButton');

let currentIndex = 1;
let isAnimating = false;
const slideWidth = slide[0].clientWidth;

// Дублируем 1-ый и последний слайд в список для создания нужного перехода

const firstSlide = slide[0].cloneNode(true);
const lastSlide = slide[slide.length - 1].cloneNode(true);

slides.appendChild(firstSlide);
slides.insertBefore(lastSlide, slide[0]);

// Начальная позиция слайдера
slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

function updateSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    const offset = -index * slideWidth;
    const duration = 500;
    const startTime = performance.now();
    const startOffset = parseFloat(slides.style.transform.replace('translateX(', '').replace('px)', ''));

    // Описание кривой Базье
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Функция для создания анимации перехода
    function animate(currentTime) {

        const elapsedTime = currentTime - startTime // Прошедшее время анимации
        const progress = Math.min(elapsedTime / duration, 1) // Прогресс анимации
        const easeProgress = easeInOutCubic(progress) // вычисляем плавность изменения смещения слайда
        const currentOffset = startOffset + (offset - startOffset) * easeProgress // Расчитываем текущее смещение слайда

        slides.style.transform = `translateX(${currentOffset}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {

            if (index === 0) {
                slides.style.transform = `translateX(${-slide.length * slideWidth}px)`;
                currentIndex = slide.length;
            } else if (index === slide.length + 1) {
                slides.style.transform = `translateX(${-slideWidth}px)`;
                currentIndex = 1;
            } else {
                currentIndex = index;
            }

            isAnimating = false;
            updateItemButtons(currentIndex);

        }

    }

    requestAnimationFrame(animate);

}

function updateItemButtons(index) {
    itemButtons.forEach((item, i) => item.classList.toggle('active', i === index - 1));
}

function previousButtonHandler() {
    if (isAnimating) return
    const nextIndex = currentIndex - 1
    updateSlide(nextIndex < 0 ? slide.length : nextIndex)
}

function nextButtonHandler() {
    if (isAnimating) return
    const nextIndex = currentIndex + 1
    updateSlide(nextIndex > slide.length + 1 ? 1 : nextIndex)
}

function itemButtonHandler(index) {
    if (isAnimating) return
    updateSlide(index + 1)
}

previousButton.addEventListener('click', previousButtonHandler);
nextButton.addEventListener('click', nextButtonHandler);
itemButtons.forEach((button, index) => button.addEventListener('click', () => itemButtonHandler(index)));

// Автоматический переход

/*
setInterval(() => {
    nextButton.click();
}, 2000);
 */

updateItemButtons(currentIndex);