var myIndex = 0;
slideshow();

function slideshow() {
  var arr = document.getElementsByClassName("slide");
  for (let i=0; i<arr.length; i++) {
    arr[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > arr.length) {myIndex = 1}    
  arr[myIndex-1].style.display = "block";  
  setTimeout(slideshow, 4000);    
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
document.getElementById('click1').onclick = ()=>{modal.style.display = 'block'};
document.getElementById('click2').onclick = ()=>{modal.style.display = 'block'};
document.getElementById('click3').onclick = ()=>{modal.style.display = 'block'};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
} 