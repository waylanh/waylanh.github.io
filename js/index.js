function fadeIn(el, num) {
  !num ? num = 1000: null;
  el.style.opacity = 0;
  el.style.display = 'block';
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / num;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}
fadeIn(document.getElementById('nav'));
setTimeout( ()=> {fadeIn(document.getElementById('head'), 2000)}, 1000 );