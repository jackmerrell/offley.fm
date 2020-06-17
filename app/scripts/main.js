let DateTime = luxon.DateTime;

const player = document.getElementById('player');
const play = document.getElementById('play');
const mute = document.getElementById('mute');

const numSecondsDay = 86400;

play.addEventListener('click', () => {
  player.play().then(() => {
    player.pause();
    playerTime()
  });
});

mute.addEventListener('click', () => {
  player.muted = true;
});

function playerTime() {

  // get track duration length
  let duration = player.duration;
  console.log('track duration = ' + duration);

  // player offset
  let offset = numSecondsDay / duration;
  console.log('times the track will play in a day = ' + offset);

  // get current time of day in seconds
  let currentTime = ((DateTime.utc().hour) * 3600) + ((DateTime.utc().minute) * 60) + (DateTime.utc().second);
  console.log('current time = ' + currentTime);

  // get current time of day in percentage
  let getDayPercent = currentTime / numSecondsDay;
  console.log('current time of day as percentage = ' + getDayPercent);

  // get the number of times the track has played today
  let numOfTimesPlayed = Math.floor(offset * getDayPercent);
  console.log('Number of times played today = ' + numOfTimesPlayed);

  // time of track to move to in seconds
  let scrubTo = duration * ((offset * getDayPercent) - numOfTimesPlayed);
  console.log('time in seconds to scrub to = ' + scrubTo);

  player.play()
  player.currentTime = scrubTo;
  player.muted = false;

}
