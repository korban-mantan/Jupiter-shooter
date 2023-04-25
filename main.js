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

// function to change background when a button is clicked (start/exit button)
const button = document.getElementById('myButton')
const body = document.getElementById('body')
let changeBackground = true

button.addEventListener('click', () => {
  if (changeBackground) {
    body.style.backgroundImage = "url('assets/img/bg2.png')"
  } else {
    body.style.backgroundImage = "url('assets/img/bg.png')"
  }
  changeBackground = !changeBackground
})
