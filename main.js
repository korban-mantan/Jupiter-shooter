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
  audioElement.play()
}

startForm.addEventListener('submit', (event) => {
  event.preventDefault()
  closeMenu()
})

// autoplay music and mute function
const audioElement = document.getElementById('bgMusic')
const muteButton = document.getElementById('mute')

// check local storage for muted state
const isMuted = localStorage.getItem('isMuted') === 'true'

// set initial muted state
audioElement.muted = isMuted
// update button text
muteButton.innerText = isMuted ? 'Unmute' : 'Mute'

// add click event listener to toggle mute state and update button text
muteButton.addEventListener('click', () => {
  audioElement.muted = !audioElement.muted
  muteButton.innerText = audioElement.muted ? 'Unmute' : 'Mute'

  // save muted state to local storage
  localStorage.setItem('isMuted', audioElement.muted)
})

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const image = new Image()
image.src = './assets/img/jupiter.png'

image.onload = () => {
  // const canvasWidth = canvas.width
  // const canvasHeight = canvas.height
  // const imageWidth = image.width / 2
  // const imageHeight = image.height / 2

  // // Calculate the position where we want to draw the image
  // const x = canvasWidth / 2 - imageWidth / 2
  // const y = canvasHeight / 2 - imageHeight / 2

  // // Draw the image on the canvas
  // ctx.drawImage(image, x, y, imageWidth, imageHeight)

  let angle = 0

  // Define the animation loop
  function animate () {
    // Clear the canvas before drawing the image
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save the current context state
    ctx.save()

    // Translate the origin to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Rotate the canvas around the center
    ctx.rotate(angle * Math.PI / 180)

    // Draw the image at the center of the canvas
    ctx.drawImage(image, -image.width / 8, -image.height / 8, image.width / 4, image.height / 4)

    // Restore the context state
    ctx.restore()

    // Increase the angle of rotation for the next frame
    angle += 1

    // Request the next animation frame
    requestAnimationFrame(animate)
  }

  // Start the animation loop
  animate()
}
