const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const screens = document.querySelectorAll('.screen')
const colors = ['#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08']
let time = 0
let score = 0

startBtn.addEventListener('click', (evt) => {
  evt.preventDefault()
  screens[0].classList.add('up')
})
timeList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('time-btn')) {
    time = parseInt(evt.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('circle')) {
    score++
    evt.target.remove()
    createRandomcCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomcCircle()
  setTime(time)
}
function decreaseTime() {
  if (time === 0) {
    finisGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}
function finisGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}
function createRandomcCircle() {
  const circle = document.createElement('div')
  const { height, width } = board.getBoundingClientRect()
  const size = getRandomNumber(10, 60)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.left = `${x}px`
  circle.style.top = `${y}px`
  circle.style.background = getRandomColor()

  board.append(circle)
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
