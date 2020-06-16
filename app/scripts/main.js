let DateTime = luxon.DateTime;

let player = document.getElementById('player');
let button = document.getElementById('start-button');

button.addEventListener('click', () => {
    player.play().then(() => {
      player.pause();
      playerTime()
    });
  });

function playerTime(){

  let duration = player.duration;
  let progress = (((DateTime.utc().hour) + DateTime.utc().minute) % duration) / duration;
  console.log(progress * duration);
  player.currentTime = progress * duration;
  player.play()
}
