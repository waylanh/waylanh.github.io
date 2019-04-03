$(document).ready(function() {
  // for clickable DOM events on IOS
  const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  IS_IOS ? $('html')[0].addClass('ios'): null;
  
  $.getJSON('/json/nav-about.json', function(data) {
    myNav(data);
    myInfo(data);
    myButtons(data[2].classes);
  }); 
  $.getJSON('/json/skills.json', function(data) {
    data.forEach(x => { mySkills(x) });
  });
  $.getJSON('/json/projects.json', function(data) {
    myProjects(data);
  });
  $.getJSON('/json/contacts.json', function(data) {
    myContacts(data);
  });
  $.getJSON('/json/papers.json', function(data) {
    $('#contact').append(myLinks(data[0], 'Contact'));
    $('#contact').append(myLinks(data[1], 'Resume'));
    $('#about3 .para').append(myLinks(data[2], 'Math'));
  });
  
  var didScroll = false;
  $(window).scroll(function() {
    didScroll = true;
  });
  setInterval(function() {
    if ( didScroll ) {
      didScroll = false;
      scrollDown();
      scrollUp();
    }
  }, 250);
  $('#scrollBtn').click(topFunction);
});

//adds nav info
function myNav(data) {
  var html = '';
  data.forEach(function(info) {
    html += '<li class="navLi"><a class="navA" href="#' +info.name.toLowerCase()+ '">' +info.name+ '</a></li>';
  });
  $('#nav').append(html.trim()).fadeIn(1000);
}

//adds about-me content
function myInfo(data) {
  var span = '<span class="down">&#9660;</span>';
  var html1 = '<p class="para">'+data[0].text[0]+'</p>';
  var html2 = '<p class="para">'+data[0].text[1]+'</p>';
  var html3 = '<p class="para">'+data[0].text[2]+'</p>';
  $('#about').append(html1.trim());
  $('#about2').append(html2.trim());
  $('#about3').append(html3.trim());
  $('#home').append(span).fadeIn(500);
  $('.center-text').delay(500).fadeIn(2000);
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
  $('#skills').append(html.trim());
}

function myButtons(data) {
  var html = '';
  data.forEach(function(name) {
    html += '<button class="button" id="' +name.toLowerCase()+ '">' +name+ '</button>';
  });
  $('#filter').append(html.trim());
}

//adds my projects
function myProjects(data) {
  var html = '';
  data.forEach(function(project) {
    html += '<div class="cell ' +project.class+ '">' +
      '<img class="image" src="' +project.image+ '" alt="' +project.title+ ' image">' +
      '<div class="cover">' +
        '<span class="pro-title">' +project.title+ '</span><br>' +
        '<p class="text">'+project.text+'<p><br>' +
        '<div class="link"><a href="' +project.page+ '" target="_blank" class="btn">Page</a>' +
        '<a href="' +project.code+ '" target="_blank" class="btn">Code</a></div>' +
      '</div>' +
    '</div>';
  });
  $('#container').append(html.trim());
  $('.cell').css('display','inline-block');
}

//adds links to other account pages
function myContacts(data) {
  var html = '';
  data.forEach(function(contact) {
    html += '<div class="inline"><a href="' +contact.link+ '" target="_blank"><img src="' +contact.image+ '" alt="' +contact.name+ ' logo" class="logos ' +contact.name+ '" title="'+contact.name+'"></a><p class="link-text2">' +contact.name+ '</p></div>';
  });
  $('#contact').append(html.trim());
}

//adds email/links to pdfs
function myLinks(data, name) {
  var icon;
  var html = ''; 
  if (name === 'Contact') { icon = 'fas fa-envelope'; html = '<br>'; }
  else if (name === 'Math') { icon = 'far fa-copy'; html = '<br>'; }
  else if (name === 'Resume') { icon = 'fas fa-copy'; }
  data[name].forEach(function(pdf) {
    html += '<div class="inline">' +
            '<a href="' +pdf.src+ '" title="'+pdf.name+'"><i class="' +icon+' '+pdf.name+ '"></i></a>' +
            '<p class="link-text">' +pdf.name+ '</p></div>';
  });
  return html.trim();
}

//highlights current sort button and filters
$('#filter').click('.button', function(e){
  $('.active').removeClass('active');
  $('#'+e.target.id+'').addClass('active');
  $('.cell').css('display','none');
  $('.cell').filter('.'+e.target.id+'').css('display','inline-block');
});

//scroll functions
function scrollDown() {
  $(document).scrollTop() < 100 ? $('.down').fadeIn(500): $('.down').fadeOut(500);
}
function scrollUp() {
  $(document).scrollTop() > 100 ? $('#scrollBtn').fadeIn(500): $('#scrollBtn').fadeOut(500);
}
function topFunction() {
  $('html')[0].scrollTop = 0;
}
