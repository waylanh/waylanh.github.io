var menu = document.getElementById('menu');
var contact = document.getElementById('contact');

var menuBtn = document.getElementById("menuBtn");
var contactBtn = document.getElementById("contactBtn");

var closeM = document.getElementById("closeM");
var closeC = document.getElementById("closeC");

menuBtn.onclick = function() {
  menu.style.display = "block";
}
contactBtn.onclick = function() {
  contact.style.display = "block";
}

closeM.onclick = function() {
  menu.style.display = "none";
}
closeC.onclick = function() {
  contact.style.display = "none";
}

window.onclick = function(e) {
  if (e.target == menu) {
    menu.style.display = "none";
  }
  if (e.target == contact) {
    contact.style.display = "none";
  }
}

var date = document.getElementById('date');
date.value = formatDate(new Date());

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = 24 - date.getHours();
  var min = date.getMinutes();
  return monthNames[monthIndex] + ' ' + day + ' @ ' + hour + ':' + min + ' gmt';
}

console.log(formatDate(new Date()));