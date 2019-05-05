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

fetch('/json/projects.json')
  .then((resp) => resp.json())
  .then(function(data) {
    myProjects(data)
  })
  .catch(function(error) {
    console.log(error)
  });
 
function myProjects(data) {
  var html = `<h1>Projects</h1><div class="row">`;
  data.forEach(function(project) {
    html += `<div class="column">
              <div class="card">
                <div class="img-contain">
                  <img src="${project.image2}" class="over" alt="Project image">
                  <img src="${project.image}" alt="Project image">
                </div>
                <h2>${project.title}</h2>
                <p class="title">${project.text}</p>
                ${!project.image ? '<p class="soon">Coming Soon.</p><p><a class="full" href="https://github.com/waymans" target="_blank">GitHub</a></p>': '<p><a href="'+project.site+'" target="_blank">Site</a><a href="'+project.code+'" target="_blank">Code</a></p>'}
              </div>
            </div>`;
  });
  html += `</div>`;
  document.getElementById('projects').innerHTML = html;
};