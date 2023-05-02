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
const hitSounds = ['./assets/audio/hit-0.wav', './assets/audio/hit-0.wav'] // an array of audio file names
const hitSound = new Audio(hitSounds[randomIndex]) // randomly selects an audio file and creates a new Audio object

// check local storage for muted state
const isMuted = localStorage.getItem('isMuted') === 'true'

// set initial muted state
bgMusic.muted = isMuted
hitSound.muted = isMuted
// update button text
muteButton.innerText = isMuted ? 'Unmute' : 'Mute'

// add click event listener to toggle mute state and update button text
muteButton.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted
  hitSound.muted = !hitSound.muted
  muteButton.innerText = bgMusic.muted ? 'Unmute' : 'Mute'

  // save muted state to local storage
  localStorage.setItem('isMuted', bgMusic.muted, hitSound.muted)
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
  x: 400, // X position
  y: 100, // Y position
  radius: 10 // Radius
}

const jupiter = new Image()
jupiter.src = 'assets/img/jupiter.png'

// Define the images
const images = [new Image(), new Image(), new Image(), new Image()]

// Set the source of each image
const imageSource = [
  'assets/img/bot0.png',
  'assets/img/bot1.png',
  'assets/img/bot2.png',
  'assets/img/bot3.png'
]
// Set the default source for the images
for (let i = 0; i < imageSource.length; i++) {
  const sources = imageSource[i]
  images[i].src = sources
}

const imagesOnHit = [
  'assets/img/bot0-hit.png',
  'assets/img/bot1-hit.png',
  'assets/img/bot2-hit.png',
  'assets/img/bot3-hit.png'
]

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
  { x: 500, y: 100, width: 75, height: 75, hp: 5, hpEl: hpElements[0] },
  { x: 200, y: 100, width: 75, height: 75, hp: 5, hpEl: hpElements[1] },
  { x: 200, y: 400, width: 75, height: 75, hp: 5, hpEl: hpElements[2] },
  { x: 500, y: 400, width: 75, height: 75, hp: 5, hpEl: hpElements[3] }
]

// Define the render function
function render () {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Rotate the ball
  canvas.addEventListener('mousemove', (event) => {
    ball.x = event.clientX - canvas.offsetLeft
    ball.y = event.clientY - canvas.offsetTop
  })

  // Draw the ball
  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.fillStyle = 'red'
  context.fill()

  // Draw the images and check for collisions
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const box = boxes[i]
    const sources = imageSource[i]
    const imageHit = imagesOnHit[i]
    // Calculate the bounding box for the image
    const imageBox = {
      x: box.x - box.width / 2,
      y: box.y - box.height / 2,
      width: box.width * 1.2,
      height: box.height * 1.2
    }

    // Draw the image
    const jupiterWidth = jupiter.width / 3
    const jupiterHeight = jupiter.height / 3
    const jupiterX = canvas.width / 2 - jupiterWidth / 2
    const jupiterY = canvas.height / 2 - jupiterHeight / 2
    context.drawImage(jupiter, jupiterX, jupiterY, jupiterWidth, jupiterHeight)
    context.drawImage(image, box.x, box.y, box.width, box.height)

    // Check for collision between ball and image
    if (
      imageBox.x < ball.x + ball.radius &&
      imageBox.x + imageBox.width > ball.x - ball.radius &&
      imageBox.y < ball.y + ball.radius &&
      imageBox.y + imageBox.height > ball.y - ball.radius
    ) {
      const updateHP = () => {
        const heart = '❤'
        image.src = imageHit
        if (box.hp > 1) {
          box.hp--
          hpElements[i].textContent = heart.repeat(box.hp)
          console.log(box.hp, 'box', i)
          setTimeout(() => {
            image.src = sources
          }, 200)
          // hitSound.play()
        } else {
          hpElements[i].textContent = 'died'
          image.src = ''
        }
      }
      updateHP()
    }
  }
  // Request the next frame
  requestAnimationFrame(render)
}
render()
