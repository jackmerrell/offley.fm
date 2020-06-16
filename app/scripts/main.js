let DateTime = luxon.DateTime;

let player = document.getElementById('player');
let button = document.getElementById('start-button');

console.log(DateTime.utc().second);

// console.log(DateTime.utc().hour + DateTime.utc().minute + DateTime.utc().millisecond);

button.addEventListener('click', () => {
    player.play().then(() => {
      player.pause();
      playerTime()
    });
  });

function playerTime(){

  let duration = player.duration;
  let progress = ((((DateTime.utc().hour) + DateTime.utc().minute) + DateTime.utc().second) % duration) / duration;
  console.log('duration = ' + duration);
  console.log('percentage to scrub to = ' + progress * 100);
  player.currentTime = (progress * duration);
  player.play()
}
