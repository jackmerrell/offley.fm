let DateTime = luxon.DateTime;
let numSecondsDay = 86400;

let player = document.getElementById('player');
let playRecord = document.getElementById('playRecord');
let albumArt = document.getElementById('albumArt');
let button = document.getElementById('button');

let playPause = document.querySelectorAll('#playPause');

playPause.forEach(item => {
  item.addEventListener('click', event => {
    player.play().then(() => {
      player.pause();
      playStatus();
    });
  })
})

function playStatus() {
  if(albumArt.classList.contains('paused')) {
    button.innerHTML= 'mute';
    albumArt.classList.remove('paused');
    albumArt.classList.add('playing');
    play()
  } else {
    button.innerHTML= 'play';
    albumArt.classList.add('paused');
    player.muted = true;
  }
}

player.addEventListener('loadstart', event => {
  button.innerHTML= 'tunning…';
})

player.addEventListener('canplay', event => {
  button.innerHTML= 'play';
})



function play(){
  // get track duration length
  const duration = player.duration;
  console.log('track duration = ' + duration);
  // player offset
  const offset = numSecondsDay / duration;
  console.log('times the track will play in a day = ' + offset);
  // get current time of day in seconds
  const currentTime = ((DateTime.utc().hour) * 3600) + ((DateTime.utc().minute) * 60) + (DateTime.utc().second);
  console.log('current time of day in seconds = ' + currentTime);
  // get current time of day in percentage
  const getDayPercent = currentTime / numSecondsDay;
  console.log('current time of day as percentage = ' + getDayPercent);
  // get the number of times the track has played today
  const numOfTimesPlayed = Math.floor(offset * getDayPercent);
  console.log('Number of times played today = ' + numOfTimesPlayed);
  // time of track to move to in seconds
  const scrubTo = duration * ((offset * getDayPercent) - numOfTimesPlayed);
  console.log('time in seconds to scrub to = ' + scrubTo);

  player.play()
  player.currentTime = scrubTo;
  player.muted = false;
}
