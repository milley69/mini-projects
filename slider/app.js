const downBtn = document.querySelector('.down-button')
const upBtn = document.querySelector('.up-button')
const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const container = document.querySelector('.container')
const slideCount = mainSlide.querySelectorAll('div').length
let activeSlideIndex = 0

sidebar.style.top = `-${slideCount - 1}00vh`

const changeSlide = (diraction) => {
  if (diraction === 'up') {
    activeSlideIndex++
    if (activeSlideIndex === slideCount) {
      activeSlideIndex = 0
    }
  } else {
    activeSlideIndex--
    if (activeSlideIndex < 0) {
      activeSlideIndex = slideCount - 1
    }
  }

  const height = container.clientHeight

  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

upBtn.addEventListener('click', () => changeSlide('up'))
downBtn.addEventListener('click', () => changeSlide('down'))
window.addEventListener('keydown', (evt) => {
  if (evt.key === 'ArrowUp') {
    changeSlide('up')
  } else if (evt.key === 'ArrowDown') {
    changeSlide('down')
  }
})
