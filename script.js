// DOM elements
const videoPlayer = document.querySelector('.video-player');
const videoElement = document.querySelector('video');
const progressRange = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const playButton = document.getElementById('play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentDuration = document.querySelector('.duration-elapsed');
const totalDuration = document.querySelector('.total-duration');
const fullscreenButton = document.querySelector('.fullscreen');
const playbackSpeed = document.querySelector('.playback-speed');

// Play and pause
// Show the play button and title
const showPlayButton = function () {
  // Change the icon
  playButton.classList.replace('fa-circle-pause', 'fa-circle-play');
  // Change the title
  playButton.setAttribute('title', 'Play');
};

// Toggle between play and pause
const playOrPause = function () {
  if (videoElement.paused) {
    videoElement.play();
    // Change icon
    playButton.classList.replace('fa-circle-play', 'fa-circle-pause');
    // Change title
    playButton.setAttribute('title', 'Pause');
  } else {
    videoElement.pause();
    showPlayButton();
  }
};

// Show the play butto after the video has ended
videoElement.addEventListener('ended', showPlayButton);

// Progress bar
// Convert seconds to mm:ss
const convertSeconds = seconds =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

// Update the progress bar and durations
const updateProgress = function () {
  // Update the current duration in progress bar
  progressBar.style.width = `${
    (videoElement.currentTime / videoElement.duration) * 100
  }%`;
  // Update the total duration and current duration
  currentDuration.textContent = `${convertSeconds(
    videoElement.currentTime
  )} / `;
  totalDuration.textContent = `${convertSeconds(videoElement.duration)}`;
};

// Seeking in the progress bar functionality
const setProgress = function (e) {
  // Progress bar filling
  progressBar.style.width = `${(e.offsetX / progressRange.offsetWidth) * 100}%`;
  // Video current time change
  videoElement.currentTime =
    (e.offsetX / progressRange.offsetWidth) * videoElement.duration;
};

// Volume controls
let volume = 1;

const changeVolume = function (event) {
  // Read the clicked position in the volume bar
  let volumePosition = event.offsetX / volumeRange.offsetWidth;
  // Rounding the volume for min and max
  if (volumePosition < 0.1) volumePosition = 0;
  if (volumePosition > 0.9) volumePosition = 1;
  // Volume bar filling
  volumeBar.style.width = `${volumePosition * 100}%`;
  // Volume change
  videoElement.volume = volumePosition;
  // Change the volume icon depending on volume value
  volumeIcon.className = ''; // reset the class
  // Add according classes
  if (volumePosition >= 0.7)
    volumeIcon.classList.add('fa-solid', 'fa-volume-high');
  if (volumePosition < 0.7 && volumePosition > 0)
    volumeIcon.classList.add('fa-solid', 'fa-volume-low');
  if (volumePosition === 0)
    volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
  // Update the volume
  volumePosition = volume;
};

// Mute and unmute
const muteUnmute = function () {
  // Reset the class
  volumeIcon.className = '';
  // Mute
  if (videoElement.volume) {
    // Set the volume to zero
    volume = videoElement.volume;
    videoElement.volume = 0;
    volumeBar.style.width = 0;
    // Change icon
    volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
    // Change title
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    // Set the volume's level
    videoElement.volume = volume;
    // Fill the bar accordingly
    volumeBar.style.width = `${volume * 100}%`;
    // Change the icon
    volume >= 0.7
      ? volumeIcon.classList.add('fa-solid', 'fa-volume-high')
      : volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    // Change the title
    volumeIcon.setAttribute('title', 'Mute');
  }
};

// Change Playback Speed
const changePlaybackSpeed = function () {
  videoElement.playbackRate = playbackSpeed.value;
};

// Fullscreen
// View in fullscreen
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE11 */
    element.msRequestFullscreen();
  }
  videoElement.classList.add('video-fullscreen');
}

// Close fullscreen
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoElement.classList.remove('video-fullscreen');
}

// Toggle fullscreen or no fulscreen
let fullscreen = false;

const toggleFullscreen = function () {
  fullscreen ? closeFullscreen() : openFullscreen(videoPlayer);
  fullscreen = !fullscreen;
};

// Event listeners
playButton.addEventListener('click', playOrPause);
videoElement.addEventListener('click', playOrPause);
videoElement.addEventListener('timeupdate', updateProgress);
videoElement.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', muteUnmute);
playbackSpeed.addEventListener('change', changePlaybackSpeed);
fullscreenButton.addEventListener('click', toggleFullscreen);
