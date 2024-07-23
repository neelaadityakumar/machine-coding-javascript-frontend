var second = 0;
var minute = 0;
var hour = 0;
var d = new Date();
//src https://www.geeksforgeeks.org/puzzle-degrees-between-hand-of-clocks-on-315/
setInterval(function () {
  d = new Date();
  const sec = d.getSeconds(),
    min = d.getMinutes(),
    hr = d.getHours();
  secondDegree = sec * (360 / 60);
  minuteDegree = min * (360 / 60) + Math.round(sec * 0.1);
  //Each second corresponds to 0.1 degrees of minute hand movement because:

  //  60 minute = 360 degree
  //  3600 seconds = 360 degree
  //  1 seconds = 0.1 degree

  hourDegree = hr * 30 + Math.round(min * 0.5) + Math.round((sec * 0.5) / 12);

  //Each hour corresponds to 0.5 degrees of hour hand movement because:
  //  12 hours = 360 degree
  //  720 minute = 360 degree
  //  1 minute = 0.5 degree
  //  1 sec= 0.5/12 degree
  document.getElementById("second-hand").style.transform =
    "rotate(" + secondDegree + "deg)";
  document.getElementById("minute-hand").style.transform =
    "rotate(" + minuteDegree + "deg)";
  document.getElementById("hour-hand").style.transform =
    "rotate(" + hourDegree + "deg)";
}, 1000);
