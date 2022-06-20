let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}
let audio = document.createElement('audio')
let points = document.querySelector('#points')
let levels = document.querySelector('#levels')
let records = document.querySelector('#records')
let level = 0

function soundBite() {
  audio.src = './audio/sound_bite.mp3'
  audio.play()
}

function makeBG() {
  context.fillStyle = 'lightgreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
  context.lineWidth = 2
  context.strokeStyle = 'green'
  context.strokeRect(0, 0, canvas.width, canvas.height)

  context.shadowColor = 'red'
}

function makeSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawnFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

function setStats() {
  points.innerText = snake.length
  record = Number(points.innerText)

  if (snake.length % 10 == 0) {
    level += 1
  }

  levels.innerText = level

  if (snake.length > Number(localStorage.getItem('record'))) {
    localStorage.setItem('record', snake.length)
  }
  records.innerText = record
}

document.addEventListener('keydown', update)

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function startGame() {
  records.innerText = Number(localStorage.getItem('record'))

  if (snake[0].x >= 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y >= 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  makeBG()
  makeSnake()
  drawnFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'down') snakeY += box
  if (direction == 'up') snakeY -= box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
    setStats()
    soundBite()
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let game = setInterval(startGame, 100)
