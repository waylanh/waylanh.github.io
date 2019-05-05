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

fetch('/json/skills.json')
  .then((resp) => resp.json())
  .then(function(data) {
    mySkills(data[0]);
    mySkills(data[1]);
    mySkills(data[2]);
  })
  .catch(function(error) {
    console.log(error)
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
  document.getElementById('skills').insertAdjacentHTML('afterend', html);
};

var skillArr = document.getElementsByClassName('button');
for (let i=0; i<skillArr.length; i++) {
  console.log(skillArr[i])
  skillArr[i].addEventListener('click', skillset);
};

// highlights current button and sorts
function skillset(e){
  console.log(e.target)
  var active = document.getElementsByClassName('active')[0] || null;
  active ? active.classList.remove('active'): null;
  e.target.classList.add('active');
  var name = e.target.id;
  document.getElementsByClassName('tech')[0].style.display = 'none';
  document.getElementsByClassName('front')[0].style.display = 'none';
  document.getElementsByClassName('back')[0].style.display = 'none';
  document.getElementsByClassName('other')[0].style.display = 'none';
  fadeIn(document.getElementsByClassName(name)[0], 500);
}