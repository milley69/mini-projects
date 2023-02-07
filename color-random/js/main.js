const mainHex = document.querySelector('.main--hex')
const mainRgb = document.querySelector('.main--rgb')
const mainHsl = document.querySelector('.main--hsl')
const mainCard = document.querySelector('.main--card')
const mainButton = document.querySelector('.main--button')
const body = document.body

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}
const hexToRGB = (hex) => {
  let alpha = false
  let h = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) h = [...h].map((x) => x + x).join('')
  else if (h.length === 8) alpha = true
  h = parseInt(h, 16)
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  )
}
const toRGBArray = (rgbStr) => rgbStr.match(/\d+/g).map(Number)

const RGBToHSL = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0
  const res = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ]
  return 'hsl(' + Math.floor(res[0]) + ',' + Math.floor(res[1]) + '%,' + Math.floor(res[2]) + '%)'
}
const rgbToRgba = (rgb) => `rgba(${rgb.replace('rgb(', '').replace(')', '')}, 0.4)`

const random = (color = randomHexColorCode()) => {
  let colorRgb = hexToRGB(color)
  let rgbArr = toRGBArray(colorRgb)

  let colorHsl = RGBToHSL(rgbArr[0], rgbArr[1], rgbArr[2])
  let colorRgba = rgbToRgba(hexToRGB(color))

  body.style.backgroundColor = colorRgba

  mainCard.style.backgroundColor = color
  mainButton.style.backgroundColor = color

  mainHex.style.color = color
  mainHex.textContent = color

  mainRgb.style.color = colorRgb
  mainRgb.textContent = colorRgb

  mainHsl.style.color = color
  mainHsl.textContent = colorHsl

  localStorage.setItem('color', color)
}

const copyToClipboard = (smth) => {
  let color = smth.textContent
  smth.textContent = color.startsWith('#')
    ? '#COPIED!'
    : color.startsWith('rgb')
    ? 'rgb(CO, PI, ED)!'
    : 'hsl(CO, PI%, ED%)!'
  smth.style.color = randomHexColorCode()
  setTimeout(() => {
    smth.textContent = color
    smth.style.color = color
  }, 750)

  navigator.clipboard.writeText(color)
}

document.addEventListener('click', (e) => {
  const target = e.target
  if (target == mainButton) random()
  if (target == mainHex) copyToClipboard(mainHex)
  if (target == mainRgb) copyToClipboard(mainRgb)
  if (target == mainHsl) copyToClipboard(mainHsl)
})

localStorage.getItem('color') ? random(localStorage.getItem('color')) : random()
