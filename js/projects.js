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
                  <img src="${project.blank}" alt="Project image">
                    
                  ${project.image ? '<div class="inner">'+
                    '<svg class="svg" height="100" width="100">'+
                      '<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">'+
                        '<stop offset="0%" style="stop-color:white;stop-opacity:1" />'+
                        '<stop offset="100%" style="stop-color:black;stop-opacity:1" />'+
                      '</linearGradient>'+
                      '<circle cx="50" cy="50" r="40" stroke="url(#grad1)" stroke-width="10" fill="white" />'+
                      '<rect width="300" height="50" style="fill:white" />'+
                      'Sorry, your browser does not support inline SVG.'+
                    '</svg>'+
                  '</div>': '' }

                  <img src="${project.image}" onload="fadeIn(this)" class="over" alt="Project image">
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