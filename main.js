/** Start menu functions */
const startForm = document.getElementById('inputField')
const nameField = document.getElementById('nameField')
const startBtn = document.getElementById('startBtn')
const gameMenu = document.getElementById('gameMenu')
const gameBody = document.getElementById('game')

// Disable button when there is no value inside name field
nameField.addEventListener('keyup', () => {
  if (nameField.value === '') {
    startBtn.disabled = true
  } else {
    startBtn.disabled = false
  }
})

// Close menu and set name to localhost
const closeMenu = () => {
  gameMenu.classList.add('hidden')
  gameBody.classList.remove('hidden')

  localStorage.setItem('name', nameField.value)
  bgMusic.play()
  // Start the rendering loop
  requestAnimationFrame(render)
}

startForm.addEventListener('submit', (event) => {
  event.preventDefault()
  closeMenu()
})

// autoplay music and mute function
const randomIndex = Math.floor(Math.random() * 2) // generates a random number between 0 and 1
const bgMusic = document.getElementById('bgMusic')
const muteButton = document.getElementById('mute')
const ballHitSounds = ['./assets/audio/hit-0.wav', './assets/audio/hit-0.wav'] // an array of audio file names
const ballHitSound = new Audio(ballHitSounds[randomIndex]) // randomly selects an audio file and creates a new Audio object
const onHitSound = new Audio()
onHitSound.src = './assets/audio/caught.wav'

// check local storage for muted state
const isMuted = localStorage.getItem('isMuted') === 'true'

// set initial muted state
bgMusic.muted = isMuted
ballHitSound.muted = isMuted
// update button text
muteButton.innerText = isMuted ? 'Unmute' : 'Mute'

// add click event listener to toggle mute state and update button text
muteButton.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted
  ballHitSound.muted = !ballHitSound.muted
  onHitSound.muted = !onHitSound.muted
  muteButton.innerText = bgMusic.muted ? 'Unmute' : 'Mute'

  // save muted state to local storage
  localStorage.setItem(
    'isMuted',
    bgMusic.muted,
    ballHitSound.muted,
    onHitSound.muted
  )
})

// Get the canvas element
const canvas = document.getElementById('canvas')

// Set the canvas size
canvas.width = 800
canvas.height = 600

// Get the 2D rendering context
const context = canvas.getContext('2d')

// Define the ball
const ball = {
  x: canvas.width / 2, // X position
  y: canvas.height / 2, // Y position
  radius: 10 // Radius
}
// Function for characters to dodge the ball
function charDodge (Array, i) {
  Array[i]--
}
const jupiter = new Image()
jupiter.src = 'assets/img/jupiter.png'

// Define the images
const characters = [new Image(), new Image(), new Image(), new Image()]

// Set the source of each image
const imageSource = [
  'assets/img/bot0.png',
  'assets/img/bot1.png',
  'assets/img/bot2.png',
  'assets/img/bot3.png'
]
// Set the default source for the characters
for (let i = 0; i < imageSource.length; i++) {
  const sources = imageSource[i]
  characters[i].src = sources
}

// const imagesOnHit = [
//   'assets/img/bot0-caught.png',
//   'assets/img/bot1-caught.png',
//   'assets/img/bot2-caught.png',
//   'assets/img/bot3-caught.png'
// ]

// Initialize the health system for each box
const hpElements = [
  document.getElementById('playerHp'),
  document.getElementById('bot1Hp'),
  document.getElementById('bot2Hp'),
  document.getElementById('bot3Hp')
]
// initialize the default value of hpElement
for (let i = 0; i < hpElements.length; i++) {
  const hpText = hpElements[i]
  hpText.innerText = '❤❤❤❤❤'
}
// Define the bounding boxes for each image
const boxes = [
  { x: 583, y: 100, width: 100, height: 100, hp: 5, hpEl: hpElements[0] },
  { x: 136, y: 100, width: 100, height: 100, hp: 5, hpEl: hpElements[1] },
  { x: 136, y: 420, width: 100, height: 100, hp: 5, hpEl: hpElements[2] },
  { x: 583, y: 420, width: 100, height: 100, hp: 5, hpEl: hpElements[3] }
]

// initialize the game over dialog
const overDialog = document.getElementById('postGame')

let angle = 0

// Define the render function
function render () {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Rotate the ball
  const ballX = ball.x + 210 * Math.cos(angle)
  const ballY = ball.y + 210 * Math.sin(angle)

  // Draw the ball
  context.beginPath()
  context.arc(ballX, ballY, ball.radius, 0, Math.PI * 2)
  context.fillStyle = 'red'
  context.fill()

  angle += 0.05

  // Draw the characters and check for collisions
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i]
    const box = boxes[i]
    const sources = imageSource[i]
    // const imageHit = imagesOnHit[i]
    // Calculate the bounding box for the char
    const imageBox = {
      x: box.x,
      y: box.y,
      width: 80,
      height: 80
    }
    // hitbox
    // context.beginPath()
    // context.rect(imageBox.x, imageBox.y, imageBox.width, imageBox.height)
    // context.fillStyle = '#ddd'
    // context.fill()
    context.scale(-1, 1)

    // Draw the char
    const jupiterWidth = jupiter.width / 3
    const jupiterHeight = jupiter.height / 3
    const jupiterX = canvas.width / 2 - jupiterWidth / 2
    const jupiterY = canvas.height / 2 - jupiterHeight / 2
    context.drawImage(
      characters[0],
      boxes[0].x,
      boxes[0].y,
      box.width,
      box.height
    )
    context.drawImage(
      characters[1],
      -boxes[1].x,
      boxes[1].y,
      box.width,
      box.height
    )
    context.drawImage(
      characters[2],
      -boxes[2].x,
      boxes[2].y,
      box.width,
      box.height
    )
    context.drawImage(
      characters[3],
      boxes[3].x,
      boxes[3].y,
      box.width,
      box.height
    )
    context.drawImage(jupiter, jupiterX, jupiterY, jupiterWidth, jupiterHeight)

    // Controls
    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowDown') {
        charDodge(boxes, 0)
      }
    })

    // Check for collision between ball and char
    if (
      imageBox.x < ballX + ball.radius &&
      imageBox.x + imageBox.width > ballX - ball.radius &&
      imageBox.y < ballY + ball.radius &&
      imageBox.y + imageBox.height > ballY - ball.radius
    ) {
      const updateHP = () => {
        const heart = '❤'
        char.src = './assets/img/ambatukam.webp'
        if (box.hp <= 1) {
          char.src = ''
          hpElements[i].textContent = 'died'
        } else {
          onHitSound.play()
          box.hp--
          hpElements[i].textContent = heart.repeat(box.hp)
          console.log(box.hp, 'box', i)
          setTimeout(() => {
            char.src = sources
          }, 150)
        }
      }
      updateHP()
    }
  }

  // Check if all opponents has died and player is still alive
  if (
    boxes[0].hp === 0
  ) {
    cancelAnimationFrame(render)
    overDialog.showModal()
  } else {
    // Request the next frame
    requestAnimationFrame(render)
  }
}
