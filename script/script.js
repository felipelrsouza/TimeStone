let clock = 0

function timestrToSec(timestr) {
  //converte formato de tempo para segundos
  var parts = timestr.split(':')
  return parts[0] * 3600 + parts[1] * 60 + +parts[2]
}

function pad(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return '' + num
  }
}

function formatTime(seconds) {
  //Converte segundos para formato de tempo
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
  ].join(':')
}

let timer1 = 0

function changeText() {
  clock = 1
  if (clock == 1) {
    timer1++
    document.getElementById('timer1').innerHTML = formatTime(timer1)
  }
}

setInterval(changeText, 1000)

changeText()
