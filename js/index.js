$(document).ready(function() {
  $.getJSON('/data/nav-about.json', function(data) {
    $('#nav').append(myNav(data));
    $('#about').append(myInfo(data));
  }); 
  $.getJSON('/data/skills.json', function(data) {
    $('#skills').append(mySkills(data[0]));
    $('#skills').append(mySkills(data[1]));
    $('#skills').append(mySkills(data[2]));
  });
  $.getJSON('/data/projects.json', function(data) {
    $('#container').append(myProjects(data))
  });
  $.getJSON('/data/contacts.json', function(data) {
    $('#contact').append(myContacts(data));
  });
  $.getJSON('/data/papers.json', function(data) {
    $('#foot').append(myLinks(data[0], 'Contact'));
    $('#foot').append(myLinks(data[1], 'Resume'));
    $('#foot').append(myLinks(data[2], 'Math'));
  });
});

function myNav(data) {
  var html = '';
  data.forEach(function(info) {
    html += '<li class="navLi"><a class="navA" href="#' +info.name.toLowerCase()+ '">' +info.name+ '</a></li>';
  });
  return html;
}

function myInfo(data) {
  return '<p class="para">' +data[0].text+ '</p>';
}

function myContacts(data) {
  var html = '';
  data.forEach(function(contact) {
    html += '<a href="' +contact.link+ '" target="_blank"><img src="' +contact.image+ '" alt="' +contact.name+ ' logo"  class="logos"></a>';
  });
  return html;
}

// doesnt account for two rows
function myProjects(data) {
  var html = '';
  data.forEach(function(project) {
    html += '<div class="cell">' +
      '<img class="image" src="' +project.image+ '" alt="' +project.title+ ' image">' +
      '<div class="cover">' +
        project.title+ '<br><br>' +
        project.text+ '<br><br>' +
        '<a href="' +project.page+ '" target="_blank" class="link page">Page</a>' +
        '<a href="' +project.code+ '" target="_blank" class="link link2 code">Code</a>' +
      '</div>' +
    '</div>';
  });
  return html;
}

function mySkills(data) {
  var num2 = data.text.search(/\s/);
  var name = data.text.slice(0,num2).toLowerCase();
  var html = '<div class="' +name+ '">' +
        '<h3>' +data.text+ '</h3><hr>' +
        '<div class="flex">';
  data.list.forEach(function(skill) {
    var num1 = skill.search(/\./);
    var newSkill = skill.slice(0,num1);
    html += '<div><img src="img/logos/' +skill+ '" alt="' +newSkill+ ' logo" class="logos"><br>' +newSkill+ '</div>';
  })
  html += '</div></div>';
  return html;
}

function myLinks(data, name) {
  var html = '<div class="dropdown">'+
          '<button class="dropbtn">' +name+ '</button>'+
          '<div class="dropdown-content">';
  data[name].forEach(function(pdf) {
    html += '<a href="' +pdf.src+ '">' +pdf.name+ '</a>';
  });
  html += '</div></div>';
  return html;
}
