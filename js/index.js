$(document).ready(function() {
  $.getJSON('/json/nav-about.json', function(data) {
    $('#nav').append(myNav(data));
    $('#about').append(myInfo(data));
    $('#filter').append(myButtons(data[2].classes));
  }); 
  $.getJSON('/json/skills.json', function(data) {
    $('#skills').append(mySkills(data[0]));
    $('#skills').append(mySkills(data[1]));
    $('#skills').append(mySkills(data[2]));
  });
  $.getJSON('/json/projects.json', function(data) {
    $('#container').append(myProjects(data))
    $('.cell').css('display','inline-block');
  });
  $.getJSON('/json/contacts.json', function(data) {
    $('#contact').append(myContacts(data));
  });
  $.getJSON('/json/papers.json', function(data) {
    $('#foot').append(myLinks(data[0], 'Contact'));
    $('#foot').append(myLinks(data[1], 'Resume'));
    $('#foot').append(myLinks(data[2], 'Math'));
  });
});

//adds nav info
function myNav(data) {
  var html = '';
  data.forEach(function(info) {
    html += '<li class="navLi"><a class="navA" href="#' +info.name.toLowerCase()+ '">' +info.name+ '</a></li>';
  });
  return html.trim();
}

//adds about-me content
function myInfo(data) {
  return '<p class="para">'+data[0].text+'</p><br><span class="down">&#9660;</span>';
}

//adds logos for skills
function mySkills(data) {
  var num2 = data.text.search(/\s/);
  var name = data.text.slice(0,num2).toLowerCase();
  var html = '<div class="' +name+ '">' +
             '<h3>' +data.text+ '</h3><hr>';
  data.list.forEach(function(skill) {
    var num1 = skill.search(/\./);
    var newSkill = skill.slice(0,num1);
    html += '<div class="inline"><img src="img/logos/' +skill.toLowerCase()+ '" alt="' +newSkill+ ' logo" class="logos ' +newSkill+ '"><br>' +newSkill+ '</div>';
  })
  html += '</div>';
  return html.trim();
}

function myButtons(data) {
  var html = '';
  data.forEach(function(name) {
    html += '<button class="button" id="' +name.toLowerCase()+ '">' +name+ '</button>';
  });
  return html.trim();
}

//adds my projects
function myProjects(data) {
  var html = '';
  data.forEach(function(project) {
    html += '<div class="cell ' +project.class+ '">' +
      '<img class="image" src="' +project.image+ '" alt="' +project.title+ ' image">' +
      '<div class="cover">' +
        project.title+ '<br>' +
        '<p class="text">'+project.text+'<p><br>' +
        '<div class="link"><a href="' +project.page+ '" target="_blank" class="btn">Page</a>' +
        '<a href="' +project.code+ '" target="_blank" class="btn">Code</a></div>' +
      '</div>' +
    '</div>';
  });
  return html.trim();
}

//adds links to other account pages
function myContacts(data) {
  var html = '';
  data.forEach(function(contact) {
    html += '<a href="' +contact.link+ '" target="_blank"><img src="' +contact.image+ '" alt="' +contact.name+ ' logo" class="logos ' +contact.name+ '" title="'+contact.name+'"></a>';
  });
  return html.trim();
}

//adds email/links to pdfs
function myLinks(data, name) {
  var html = '<div class="dropdown">'+
          '<button class="dropbtn">' +name+ '</button>'+
          '<div class="dropdown-content">';
  data[name].forEach(function(pdf) {
    html += '<a href="' +pdf.src+ '">' +pdf.name+ '</a>';
  });
  html += '</div></div>';
  return html.trim();
}

//adds opacity to down arrow on main screen
$(window).scroll(function() {
  var top = $(this).scrollTop();
  $('.down').css({
    opacity: function() {
      var ele = $(this).height();
      return 1 - 1.1*(top - ele) / top; 
    }
  });
});

//highlights current sort button and filters
$('#filter').click('.button', function(e){
  $('.active').removeClass('active');
  $('#'+e.target.id+'').addClass('active');
  $('.cell').css('display','none'); // show() and hide() produce an inline instead
  $('.cell').filter('.'+e.target.id+'').css('display','inline-block');
});
