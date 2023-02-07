// import quotes from './quotes.js'
const button = document.querySelector('.main--button')
const quoteText = document.querySelector('.main--quote-text')
const quoteAuthor = document.querySelector('.main--author')
let randomQuote = 0

button.addEventListener('click', () => {
  let randomNumber = Math.floor(Math.random() * quotes.length)
  if (randomNumber != randomQuote) {
    quoteText.textContent = quotes[randomQuote].quote
    quoteAuthor.textContent = quotes[randomQuote].author
    randomQuote = Math.floor(Math.random() * quotes.length)
  } else button.click()
})
