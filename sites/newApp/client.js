var h = window.innerHeight;

// slideshow
var slideIndex = 1; 
showSlides();
//var timer = setTimeout(showSlides, 5000);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides() {
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (slideIndex > slides.length) {slideIndex = 1}    
  if (slideIndex < 1) {slideIndex = slides.length}
  for (let i=0; i<slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (let i=0; i<dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  slides[slideIndex-1].style.height = h+"px";
  dots[slideIndex-1].className += " active";
}
document.getElementById('prev').onclick = function() {plusSlides(-1)};
document.getElementById('next').onclick = function() {plusSlides(1)};
document.getElementById('one').onclick = function() {currentSlide(1)};
document.getElementById('two').onclick = function() {currentSlide(2)};
document.getElementById('three').onclick = function() {currentSlide(3)};