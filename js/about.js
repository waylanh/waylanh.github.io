function fadeIn(el) {
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 1000;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}
fadeIn(document.getElementById('nav'));

$.getJSON('/json/skills.json', function(data) {
  $('#skills').append(mySkills(data[0]));
  $('#skills').append(mySkills(data[1]));
  $('#skills').append(mySkills(data[2]));
});
  
function mySkills(data) {
  var num2 = data.text.search(/\s/);
  var name = data.text.slice(0,num2).toLowerCase();
  var html = `<div class="${name} none">`;
  data.list.forEach(function(skill) {
    var num1 = skill.search(/\./);
    var newSkill = skill.slice(0,num1);
    html += `<div class="inline"><img src="img/logos/${skill.toLowerCase()}" alt="${newSkill} logo" class="logos ${newSkill}"><br><span class="logo-text">${newSkill}</span></div>`;
  })
  html += `</div>`;
  return html;
};
  
//highlights current sort button and filters
$('#filter').click('.button', function(e){
  console.log(e.target)
  $('.active').removeClass('active');
  $(e.target).addClass('active');
  var name = $(e.target).attr('id');
  $('.tech').hide();
  $('.front').hide();
  $('.back').hide();
  $('.other').hide();
  $('.'+name).fadeIn(500);
});