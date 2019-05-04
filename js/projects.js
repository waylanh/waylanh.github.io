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
                <img src="${project.image}" alt="Project image">
                <h2>${project.title}</h2>
                <p class="title">${project.text}</p>
                ${!project.image ? '<p class="soon">Coming Soon.</p>': ''}
                <p><a href="${project.site}" target="_blank">Site</a><a href="${project.code}" target="_blank">Code</a></p>
              </div>
            </div>`;
  });
  html += `</div>`;
  document.getElementById('projects').innerHTML = html;
};