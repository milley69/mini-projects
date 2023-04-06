const board = document.querySelector('#board')
const colors = ['#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08']
const SQUARES_NUMBER = 49
for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div')
  square.classList.add('square')

  square.addEventListener('mouseover', setColor)
  square.addEventListener('mouseleave', removeColor)

  board.append(square)
}
function setColor(evt) {
  evt.target.style.backgroundColor = getRandomColor()
  evt.target.style.boxShadow = `0 0 2px ${getRandomColor()}, 0 0 10px ${getRandomColor()}`
}
function removeColor(evt) {
  evt.target.style.backgroundColor = '#1d1d1d'
  evt.target.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
