var w = window.innerWidth;
var h = window.innerHeight;

var arr = [ 'Welcome','to a D3','Compilation','Welcome to a D3 Compilation' ];
var alphabet = "a data-driven compilation".split("");
var svg = d3.select("svg"),
    g = svg.append("g").attr("transform", "translate(0,50)");

function update(data) {
  var t = d3.transition()
      .duration(750);
  // JOIN new data with old elements.
  var text = g.selectAll("text")
    .attr('class','text')
    .data(data, function(d) { return d; });
  // EXIT old elements not present in new data.
  text.exit()
      .attr("class", "exit text")
    .transition(t)
      .attr("y", 10)
      .style("fill-opacity", 1e-6)
      .remove();
  // UPDATE old elements present in new data.
  text.attr("class", "update text")
      .attr("y", 0)
      .style("fill-opacity", 1)
    .transition(t)
      .attr("x", function(d, i) { return i * 4; });
  // ENTER new elements present in new data.
  text.enter().append("text")
      .attr("class", "enter text")
      .attr("dy", ".35em")
      .attr("y", -10)
      .attr("x", function(d, i) { return i * 4; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
    .transition(t)
      .attr("y", 0)
      .style("fill-opacity", 1);
}

update(arr[0])
var num = 1;
var time = setInterval(function() {
  update(arr[num]);
  num++;
  if (num===4) clearInterval(time);
}, 2000);


// Get the data
var filenames = [ "dataM.json", "dataM_alt.json" ];
var dataset= [ 
  "dataM.json",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json",
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json",
  "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"
];

var q = d3.queue(2);
dataset.forEach(function(filename) {
  q.defer(d3.json, filename);
});
q.awaitAll(function(error, jsonDataSets) {
  if (error) throw error;
  makeLine(jsonDataSets[0]);
  makeBar(jsonDataSets[1]);
  makeDot(jsonDataSets[2]);
  makeBox(jsonDataSets[3]);
  makeMap(jsonDataSets[4], jsonDataSets[5]);
  makeTree(jsonDataSets[6]);
});

/* **************************************************** LINE ***************************************************** */

  var line_margin = {top: 30, right: 20, bottom: 30, left: 50},
      line_width = w - line_margin.left - line_margin.right,
      line_height = h - line_margin.top - line_margin.bottom;
  // Parse the date / time
  var line_parseDate = d3.timeParse("%d-%b-%y");
  // Set the ranges
  var line_x = d3.scaleTime().range([0, line_width]);
  var line_y = d3.scaleLinear().range([line_height, 0]);
  // Adds the svg canvas
  var line_svg = d3.select("#lineGraph")
      .append("svg")
        .attr('viewBox', '0 0 ' + (line_width+line_margin.right+line_margin.left) + ' ' + (line_height+line_margin.top+line_margin.bottom))
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .style('padding','10%')
      .append("g")
        .attr("transform", "translate(" + line_margin.right + ",0)");
  // Define the axes
  var line_xAxis = d3.axisBottom(line_x).ticks(5);
  var line_yAxis = d3.axisLeft(line_y).ticks(5);
  // Define the line
  var line_valueline = d3.line()
      .x(function(d) { return line_x(d.date); })
      .y(function(d) { return line_y(d.close); });

function makeLine(data) {
  data.forEach(function(d) {
    d.date = line_parseDate(d.date);
    d.close = +d.close;
  });
  // Scale the range of the data
  line_x.domain(d3.extent(data, function(d) { return d.date; }));
  line_y.domain([0, d3.max(data, function(d) { return d.close; })]);
  // Add the valueline path.
  line_svg.append("path")
    .attr("class", "line-line")
    .attr("d", line_valueline(data));
  // Add the X Axis
  line_svg.append("g")
    .attr("class", "line-x line-axis")
    .attr("transform", "translate(0," + line_height + ")")
    .call(line_xAxis);
  // Add the Y Axis
  line_svg.append("g")
    .attr("class", "line-y line-axis")
    .call(line_yAxis);
};

// update line
var lineToggle = false;
function updateLine() {
  let json;
  !lineToggle ? json = "./dataM_alt.json": json = "./dataM.json";
  lineToggle = !lineToggle;
  // Get the data again
  d3.json(json, function(error, data) {
    data.forEach(function(d) {
	  d.date = line_parseDate(d.date);
      d.close = +d.close;
    });
    // Scale the range of the data again 
    line_x.domain(d3.extent(data, function(d) { return d.date; }));
    line_y.domain([0, d3.max(data, function(d) { return d.close; })]);
    // Select the section we want to apply our changes to
    var line_svg = d3.select("#lineGraph").transition();
    // Make the changes
    line_svg.select(".line-line")   // change the line
      .duration(750)
      .attr("d", line_valueline(data));
    line_svg.select(".line-x.line-axis") // change the x axis
      .duration(750)
      .call(line_xAxis);
    line_svg.select(".line-y.line-axis") // change the y axis
      .duration(750)
      .call(line_yAxis);
  });
}

/* **************************************************** BAR ***************************************************** */

function makeBar(data){
  var bar_margin = {top: 30, right: 20, bottom: 30, left: 50},
      bar_width = w - bar_margin.left - bar_margin.right,
      bar_height = h - bar_margin.top - bar_margin.bottom;

  const bar_padding = 50;
                        
  const bar_xScale = d3.scaleLinear()
        .domain([d3.min(data.data, (d) => d[0].substring(0,4)), (parseFloat(d3.max(data.data, (d) => d[0].substring(0,4)))+1).toString()])
        .range([bar_padding, bar_width-bar_padding]);
    
  const bar_yScale = d3.scaleLinear()
        .domain([0,d3.max(data.data, (d) => d[1])+2000])
        .range([bar_height-bar_padding, 10]);
    
  const bar_parser = (e) => {
    if (e >= 1000) {
      return (e/1000).toFixed(4) + ' Trillion'
    } else {
      return e + ' Billion'
    }
  }
    
  const bar_body = d3.select('#barGraph')
        .style('text-align','center') 
                    
    
  const bar_tooltip = bar_body.append('div')
        .attr('id','tooltip')
        .style('opacity',0)
        .attr('class','bar_tooltip')
        .style('pointer-events', 'none')
     
    
  const bar_svg = bar_body.append("svg")
        .attr('viewBox', '-20 5 ' + (bar_width+bar_margin.right) + ' ' + (bar_height))
        .attr('preserveAspectRatio', 'xMidYMid meet')

    
        bar_svg.selectAll("rect")
          .data(data.data)
          .enter()
          .append("rect")
          .attr("x", (d)=> {
            switch(d[0].slice(5,7)) {
              case '01':
                return bar_xScale(d[0].substring(0,4).concat('.', 0));
                break;
              case '04':
                return bar_xScale(d[0].substring(0,4).concat('.', 25));
                break;
              case '07':
                return bar_xScale(d[0].substring(0,4).concat('.', 5));
                break;
              case '10':
                return bar_xScale(d[0].substring(0,4).concat('.', 75));
                break;
              default:
                break;
            }
          })
          .attr('data-date', (d, i) => {return d[0]})
          .attr('data-gdp', (d, i) => {return d[1]})
          .attr('y',(d,i) => bar_yScale(d[1]))
          .attr('height',d=> bar_height-bar_yScale(d[1])-bar_padding)
          .attr('width', 4)
          .attr('class', 'bar_bar')
          .on('mousemove', (d, i) => {
            var browserWidth = document.querySelector( 'html' ).clientWidth;
            var browserHeight = document.querySelector( 'html' ).clientHeight;
            var year, month;
            year = d[0].substring(0,4);
            month = d[0].substring(5,7);
            if (month === '01') {month = 'January'};
            if (month === '04') {month = 'April'};
            if (month === '07') {month = 'July'};
            if (month === '10') {month = 'October'};
            bar_tooltip.html(month + ', ' + year + '<br>' + '$' + bar_parser(d[1]))
              .style('left', d3.event.pageX < browserWidth/2 ? d3.event.pageX + 20 + 'px': d3.event.pageX - 220 + 'px' )
              .style('top', d3.event.pageY > browserHeight-50 ? d3.event.pageY - 50 + 'px': d3.event.pageY - 100 + 'px' )
              .style('opacity', 1) 
              .style('font-size','20px')
              .attr('data-date', d[0])
          })
          .on('mouseout', () => {bar_tooltip.style('opacity', 0)})
          .append('title')
          .attr('class','bar_tick')

    
  const bar_xAxis = d3.axisBottom(bar_xScale)
        .ticks(10, "f"); //gets rid of commas
  const bar_yAxis = d3.axisLeft(bar_yScale);
    
        bar_svg.append("g")
          .attr("transform", "translate(0," + (bar_height-bar_padding) + ")")
          .attr('id','x-axis')
          .attr('class', 'bar_axis')
          .call(bar_xAxis);
    
        bar_svg.append("g")
          .attr("transform", "translate(" + bar_padding + ",0)")
          .attr('id','y-axis')
          .attr('class', 'bar_axis')
          .call(bar_yAxis);
    
        bar_svg.append('text')
          .attr('x', bar_height/2)
          .attr('y', bar_height-3)
          .style('fill', 'black')
          .text('Year')
    
        bar_svg.append('text')
          .attr('x',-200)
          .attr('y',80)
          .text('GDP in Billions')
          .style('fill', 'black')
          .attr('transform', 'rotate(-90)')
    
        bar_svg.append('text')
          .attr('x', bar_height+85)
          .attr('y', bar_height-3)
          .style('fill', 'gray')
          .text('More Info:http://www.bea.gov/national/pdf/nipaguid.pdf')
  
}

/* **************************************************** DOT ***************************************************** */

function makeDot(data){
  const html = data;
    const m = {top: 20, right: 20, bottom: 0, left: 20};
    //const w = 1000;
    //const h = 500;
    const padding = 50;
    
    const timeFormat = d3.timeFormat("%M:%S");
    
    html.forEach(function(d) {
      d.Time = new Date(3000, 0, 0, 0, d.Time.substring(0,2), d.Time.substring(3,5));
    });
    
    const body = d3.select('#dotGraph')
                   .style('text-align', 'center')
                   .style('width','80%')
                   .style('margin','auto')
  
    
    const dot_tooltip = body.append('div') 
                      .attr('id','dot_tooltip')
                      .attr('class','dot_tooltip')
                      .style('opacity',0)
                        
    const xScale = d3.scaleLinear()
                     .domain([d3.min(html, (d) => d.Year)-1, d3.max(html, (d) => d.Year)+1])
                     .range([padding, w-padding]);
    
    const yScale = d3.scaleLinear()
                     .domain(d3.extent(html, (d) => d.Time))
                     .range([h-padding, padding]);
    
    
    const svg = body.append("svg")
                  .attr('viewBox', '-20 10 ' + (w + m.left + m.right) + ' ' + (h + m.top + m.bottom))
                  .attr('preserveAspectRatio', 'xMidYMid meet')
    
               svg.selectAll("circle")
                  .data(html)
                  .enter()
                  .append("circle")
                  .attr("cx", (d)=> xScale(d.Year)+10)
                  .attr('data-xvalue', function(d, i) {
                    return d.Year
                  })
                  .attr('data-yvalue', function(d, i) {
                    return d.Time
                  })
                  .attr('cy',(d,i) => yScale(d.Time))
                  .attr('r',5)
                  .attr('class', 'dot')
                  .style('fill', (d) => {
                    if (d.Doping === '') {
                      return 'orange'
                    }
                  })
                  .on('mouseover', (d, i) => {
                    const browserHeight = document.querySelector( 'html' ).clientHeight;
                    dot_tooltip.html('Name: ' + d.Name + '<br>' + 'Nationality: ' + d.Nationality + '<br>' + 'Time: ' + timeFormat(d.Time) + '<br>' + d.Doping)
                      .style("left", d3.event.pageX + 10 + 'px')
                      .style("top", d3.event.pageY > browserHeight-50 ? d3.event.pageY - 60 +'px': d3.event.pageY + 10 +'px')
                      .style('opacity', 1) 
                      .style('font-size','15px')
                      .attr('data-year', d.Year)
                  })
                  .on('mouseout', () => {
                    dot_tooltip.style('opacity', 0); 
                  })
                  .append('title')
                  .attr('class','tick')

    
    const xAxis = d3.axisBottom(xScale)
                    .ticks(10, "f"); //gets rid of commas
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(timeFormat);
     
    
               svg.append("g")
                  .attr("transform", "translate(10," + (h-padding) + ")")
                  .attr('id','x-axis')
                  .call(xAxis);
    
               svg.append("g")
                  .attr("transform", "translate(" + (padding + 10) + ",0)")
                  .attr('id','y-axis')
                  .call(yAxis);
    
               svg.append('text')
                  .attr('x', h-50)
                  .attr('y', h)
                  .text('Year')
    
               svg.append('text')
                  .attr('x',-350)
                  .attr('y',-10)
                  .text('Time in minutes')
                  .attr('transform', 'rotate(-90)')
    
    
    const colors = ['#b0413e', 'orange'];
    const legend = svg.selectAll(".legend")
                      .data(colors)
                      .enter().append("g")
                      .attr("id", "legend")
                      .attr("transform", function(d, i) {
                        return "translate(0," + (h/2 + i * 30) + ")";
                      });

                legend.append("rect")
                      .data(colors)
                      .attr("x", w-250)
                      .attr("width", 20)
                      .attr("height", 20)
                      .style('border', '1px solid black')
                      .style("fill", function(d, i) {
                        return colors[i];
                      });

                legend.append("text")
                      .attr("x", w-220)
                      .attr("y", 9)
                      .attr("dy", "5px")
                      .text(function(d, i) {
                        if (i) {
                          return "No doping allegations";
                        } else {
                          return "Doping allegations";
                        };
                      });
}

/* **************************************************** BOX ***************************************************** */

function makeBox(data){
  const html = data.monthlyVariance;
    
    //const w = 1315;
    //const h = 494;
    const padding = 50;

    const labels = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let color = d3.scaleSequential()
                  .domain([d3.min(html, (d) => d.variance), d3.max(html, (d) => d.variance)])
                  .interpolator(d3.interpolateInferno);
                        
    const xScale = d3.scaleLinear()
                     .domain([d3.min(html, (d) => d.year), d3.max(html, (d) => d.year)+1])
                     .rangeRound([padding, w-padding]);
    
    const yScale = d3.scaleBand()
                     .domain(months)
                     .rangeRound([h-padding, padding])
                     .paddingInner(.2)
                     .paddingOuter(0)
    
    const body = d3.select('#boxGraph')
                   .style('text-align','left')
                   .style('width', '80%')
                   .style('margin', 'auto')
    
    const box_tooltip = body.append('div')
                    .attr('id','box_tooltip')
                    .attr('class','box_tooltip')
                    .style('opacity',0)
                      
    const svg = body.append("svg")
                  .attr('viewBox', '-10 -20 ' + (w + 20 + 20) + ' ' + (h + 20 + 20))
                  .attr('preserveAspectRatio', 'xMidYMid meet')
    
               svg.selectAll(".cell") // rect
                  .data(html)
                  .enter()
                  .append("rect")
                  .attr('class', 'cell')
                  .attr("x", (d, i)=> xScale(d.year)+40)
                  .attr('data-year', (d)=> d.year )
                  .attr('data-month', (d)=> d.month-1)
                  .attr('data-temp', (d)=> d.baseTemperature + d.variance)
                  .attr('y',(d,i) => {
                    for (let i=0; i<12; i++) {
                      if (d.month === 12-i) {
                        return i*(h-2*padding)/12+padding
                      }
                    }
                  })
                  .attr('height', (h-2*padding)/12)
                  .attr('width', 5)
                  .attr('fill', (d,i)=> color(d.variance))
                  .on('mousemove', (d, i) => {
                    const browserWidth = document.querySelector( 'html' ).clientWidth;
                    const browserHeight = document.querySelector( 'html' ).clientHeight;
                    box_tooltip.html('Year: ' + d.year + '<br>' + 'Month: ' + months[d.month-1] + '<br>' + 'Variance: ' + d.variance + "&#8451;" + '<br>' + 'Temp: ' + (8.66 + d.variance).toFixed(3) + "&#8451;")
                      .style('left', d3.event.pageX < browserWidth/2 ? d3.event.pageX + 15 + 'px': d3.event.pageX - 220 + 'px' )
                      .style('top', d3.event.pageY > browserHeight-100 ? d3.event.pageY - 50 + 'px': d3.event.pageY + 'px' )
                      .style('opacity', 1) 
                      .style('font-size','15px')
                      .attr('data-year', d.year)
                      .attr('data-month', d.month-1)
                    //d3.select('.cell').style('fill', 'white')
                  })
                  .on('mouseout', () => {
                    box_tooltip.style('opacity', 0);
                    //d3.select('.cell').style('fill', (d,i)=> color(d.variance));
                  })
                  .append('title')
                  .attr('class','tick')

    
    const xAxis = d3.axisBottom(xScale)
                    .ticks(10, "f") //gets rid of commas
                    .tickSize(10,1);
    const yAxis = d3.axisLeft(yScale)
                    .tickSize(10,1);
     
    
               svg.append("g")
                  .attr("transform", "translate(40," + (h-padding) + ")")
                  .attr('id','x-axis')
                  .style('font-size','15px')
                  .call(xAxis);
    
               svg.append("g")
                  .attr("transform", "translate(" + (padding+40) + ",0)")
                  .attr('id','y-axis')
                  .style('font-size','15px')
                  .call(yAxis);
    
               svg.append('text')
                  .attr('x', w/2)
                  .attr('y', h+10)
                  .text('Year')
    
               svg.append('text')
                  .attr('x',-350)
                  .attr('y',0)
                  .text('Month')
                  .attr('transform', 'rotate(-90)')
    
    const min = d3.min(html, (d) => d.variance), max = d3.max(html, (d) => d.variance);
    const legendD = [min, (min + 1*(max-min)/9), (min + 2*(max-min)/9), (min + 3*(max-min)/9), (min + 4*(max-min)/9), (min + 5*(max-min)/9), (min + 6*(max-min)/9), (min + 7*(max-min)/9),(min + 8*(max-min)/9), max]
    
    
    const legend = svg.selectAll("legend")
                      .data(legendD)
                      .enter().append("g")
                      .attr("transform", (d, i)=> {
                        return "translate(" + (i * 30) + ",0)";
                      });

                legend.append("rect")
                      .attr("x", w-600)
                      .attr("width", 30)
                      .attr("height", 20)
                      .style('border', '1px solid black')
                      .style("fill", (d, i)=> color(d));

                legend.append("text")
                      .attr("x", w-590)
                      .attr("y", 20)
                      .attr("dy", "18px")
                      .style("fill", 'black')
                      .html( (d, i)=> {
                        return i === 9 ? labels[i]+'&deg;C': labels[i]; 
                      });
}

/* **************************************************** MAP ***************************************************** */

function makeMap(jsonE, jsonC){
  const m = {top: 20, right: 50, bottom: 20, left: 20};
      const h = 600 - m.top - m.bottom;
      const w = 950 - m.right - m.left;
      
      const county = d => jsonE.filter(x => x.fips === d.id)[0];

      const lowEduc = d3.min(jsonE, d => d.bachelorsOrHigher);
      const highEduc = d3.max(jsonE, d => d.bachelorsOrHigher);

      const colors = d3.scaleSequential()
            .domain([lowEduc, highEduc])
            .interpolator(d3.interpolateViridis)
      
      const body = d3.select('#mapGraph')
            .style('text-align', 'center')
            .style('width','80%')
            .style('margin',"auto")
          
      const map_tooltip = body.append('div')
            .attr('id','map_tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('justify-content','center')
            .style('padding', '2px')
            .style('width', '200px')
            .style('height', 'auto')
            .style('box-shadow', '3px 3px 10px black')
            .style('pointer-events', 'none')
            .style('background', 'lightsteelblue')
            .style('font-size', '20px')
      
      const container = body.append('div')
            .style('display', 'inline')
            .style('justify-content', 'center')
            .attr('id', 'container')
            .append('div')
            .style('height', h + m.top + m.bottom)
            .style('width', w + m.left + m.right)
            
      
      const svg = container.append('svg')
            .attr('id', 'map')
            .attr('viewBox', '0 0 ' + (w + m.left + m.right) + ' ' + (h + m.top + m.bottom))
            .attr('preserveAspectRatio', 'xMidYMid meet')
            

      const us = svg.append('g')
            .selectAll("path")
            .data(topojson.feature(jsonC, jsonC.objects.counties).features)
            .enter()
            .append("path") 
            .attr('class','county')
            .attr('data-fips', d => d.id)
            .attr('data-education', d => county(d).bachelorsOrHigher)
            .attr('fill', d => colors(county(d).bachelorsOrHigher))
            .attr('d', d3.geoPath())
            .on('mousemove', d => {
              const browserWidth = document.querySelector( 'html' ).clientWidth;
              const browserHeight = document.querySelector( 'html' ).clientHeight;
              map_tooltip.html(county(d).area_name + ', ' + 
                           county(d).state + ':<strong>' + ' ' + 
                           county(d).bachelorsOrHigher + '%</strong>')
                     .style('opacity',1)
                     .style('left', d3.event.pageX < browserWidth/2 ? d3.event.pageX + 20 + 'px': d3.event.pageX - 220 + 'px' )
                     .style('top', d3.event.pageY > browserHeight-50 ? d3.event.pageY - 50 + 'px': d3.event.pageY + 'px' )
                     .attr('data-education', county(d).bachelorsOrHigher)
                     
            })
            .on('mouseout', d => map_tooltip.style('opacity',0))
            

      const legend = svg.selectAll('.legend')
            .data(colors.ticks(6))
            .enter().append('g')
            .attr('transform', (d,i) => {
              return "translate(" + (w/1.6 + 40*i) + "," + "20)"})
      
      const labels = [Math.round(lowEduc), Math.round(lowEduc + (highEduc-lowEduc)/5), Math.round(lowEduc + 2*(highEduc-lowEduc)/5), Math.round(lowEduc + 3*(highEduc-lowEduc)/5), Math.round(lowEduc + 4*(highEduc-lowEduc)/5), Math.round(highEduc)];
  
      legend.append('rect')
            .attr('height', '20px')
            .attr('width', '40px')
            .style('fill', colors)
      legend.append('text')
            .data(labels)
            .style('font-size', '12px')
            .attr('x', 20)
            .attr('y', -1)
            .attr("dx", "1em")
            .text(d => d + '%')
      
      const states = svg.append('path')
            .data(topojson.feature(jsonC, jsonC.objects.states).features)
           
      states.datum(topojson.mesh(jsonC, jsonC.objects.states), (a, b) => a !== b)
            .attr("d", d3.geoPath())
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("fill", "none")
}

/* **************************************************** TREE ***************************************************** */

const tree_m = {top: 20, right: 50, bottom: 20, left: 20};
  const tree_h = 500 - tree_m.top - tree_m.bottom;
  const tree_w = 950 - tree_m.right - tree_m.left;            

  var treemapLayout = d3.treemap()
      .size([tree_w +tree_m.left+tree_m.right, tree_h +tree_m.top+tree_m.bottom])
      .paddingOuter(0);    

  const tree_body = d3.select('#treeGraph')
        .style('text-align', 'center')
        .style('width','80%')
        .style('margin','auto')
        .style('padding', '10px')

  const tree_title = tree_body.append('h3')
        .text('Video Game Sales')
        .attr('id','tree_title')
        .style('margin-bottom',0)

  const tree_subtitle = tree_body.append('h4')
        .text('Top 100 Sold Copies(in Millions) by Platform')
        .attr('id','tree_desc')
        .style('margin-top',0)

  const tree_tooltip = tree_body.append('div')
        .attr('id','tree_tooltip')
        .style('opacity', 0)
        .style('height','auto')
        .style('width','200px')
        .style('position','absolute')
        .style('justify-content','center')
        .style('background','white')
        .style('font-size','15px')
        .style('padding','5px')
        .style('border-radius','3px')
        .style('pointer-events','none')
        .style('font-family','arial')

  const tree_svg = tree_body.append('svg')
        .attr('class','tree-svg')
        .style('margin', '5px 0')
        .attr('viewBox', '0 0 ' + (tree_w + tree_m.left + tree_m.right) + ' ' + (tree_h + tree_m.top + tree_m.bottom))
        .attr('preserveAspectRatio', 'xMidYMid meet')
  
function getValue(val){
  if (val.indexOf('.') !== -1) return val;
  return Number.parseFloat(val/1000000).toFixed(2)
}

function makeTree(data){
  var rootNode = d3.hierarchy(data)

  rootNode.sum(function(d) {
    return d.value;
  });
  
  treemapLayout(rootNode);

  //array function     
  var arrayNames = [];        
  for (let i=0; i<rootNode.children.length; i++) {
    arrayNames.push(rootNode.children[i].data.name)
  }

  const colors = d3.scaleSequential()
        .domain([0,rootNode.children.length])
        .interpolator(d3.interpolateRainbow)

  const tiles = d3.select('.tree-svg')
        .selectAll('g')
        .data(rootNode.leaves())
        .enter()
        .append('g')
        .attr('class', 'tree_g')
        .attr('transform', function(d) {
          return 'translate(' + [d.x0, d.y0] + ')'
        })

  tiles.append('rect')
        .attr('class','tile')
        .attr('data-name', d=> d.data.name)
        .attr('data-category', d=> d.data.category)
        .attr('data-value', d=> d.data.value)
        .style('stroke','white')
        .style('fill', d => colors(arrayNames.indexOf(d.data.category)))
        .attr('width', function(d) { return d.x1 - d.x0; })
        .attr('height', function(d) { return d.y1 - d.y0; })
        .on('mousemove', function(d) {
          const browserWidth = document.querySelector( 'html' ).clientWidth;
          const browserHeight = document.querySelector( 'html' ).clientHeight;
          tree_tooltip.html('<b>Name:</b> ' + d.data.name + '<br>' +
                       '<b>Category:</b> ' + d.data.category + '<br>' +
                       '<b>Value:</b> $' + getValue(d.data.value) +' Mil')
                .style('opacity',.9)
                .style('left', d3.event.pageX < browserWidth/2 ? d3.event.pageX + 20 + 'px': d3.event.pageX - 220 + 'px' )
                .style('top', d3.event.pageY > browserHeight-70 ? d3.event.pageY - 50 + 'px': d3.event.pageY + 'px' )
                .attr('data-value', d.data.value)
        })
        .on('mouseout', function(d) {
          tree_tooltip.style('opacity',0)
        })

  tiles.append('text')
        .selectAll('tspan')
        .data(d=> d.data.name.split(','))
        .enter().append('tspan')
        .attr('class','tree_text')
        .attr('x', 4)
        .attr('dy', 14)
        .style('font-size','12px')
        .text(function(d) {
          return d;
        })

  const tree_legend = tree_body.append('g')
        .attr('class','tree_legend')
        .selectAll('.tree_legend')
        .data(data.children)
        .enter()
        .append('g')
        .style('background', (d,i)=> colors(i))
        .style('border', '1px solid white')
        .style('display','inline-block')
        .style('padding','0 10px')

  tree_legend.append('text')
        .attr('class','tree-text')
        .data(arrayNames)
        .style('font-size', '12px')
        .style('text-shadow','0px 0px 1px white')
        .text(d => d + ' ')
}


// update tree
var treeToggle = 0;
function updateTree() {
  var info;
  var games = {
    title: 'Video Game Sales',
    url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
    description: 'Top 100 Sold Copies(in Millions) by Platform'
  }, 
  movies = {
    title: 'Movie Sales',
    url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
    description: 'Top 100 Grossed(in Millions) in the US/Canada by Genre'
  },
  kicks = {
    title: 'Kickstarter Pledges',
    url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
    description: 'Top 100 Most Pledged(in Millions) Campaigns by Category'
  };
  
  let json;
  if (treeToggle === 0) {
    json = movies.url;
    info = movies
  } else if (treeToggle === 1) {
    json = kicks.url;
    info = kicks
  } else {
    json = games.url;
    info = games
  }
  treeToggle === 2 ? treeToggle = 0: treeToggle++;
  
  // Get the data again
  d3.json(json, function(error, data) {

    var rootNode = d3.hierarchy(data)
    rootNode.sum(function(d) {return d.value});
    treemapLayout(rootNode);
    
    var arrayNames = [];        
    for (let i=0; i<rootNode.children.length; i++) {
      arrayNames.push(rootNode.children[i].data.name)
    } 
    
    var colors = d3.scaleSequential()
          .domain([0,rootNode.children.length])
          .interpolator(d3.interpolateRainbow);
    
    var t = d3.transition().duration(1500);
    
    tree_title.text(info.title)
    tree_subtitle.text(info.description)
    
    var g = d3.select('.tree-svg').selectAll('g')
        .data(rootNode.leaves());
        
        g.exit()
        .transition(t)
        .style("fill-opacity", 0)
        .remove()
    
        g.transition(t)
        .attr('transform', function(d) {
          return 'translate(' + [d.x0, d.y0] + ')'
        })
        
        .select('rect')
        .attr('data-name', d=> d.data.name)
        .attr('data-category', d=> d.data.category)
        .attr('data-value', d=> d.data.value)
        .style('stroke','white')
        .style('fill', d => colors(arrayNames.indexOf(d.data.category)))
        .attr('width', function(d) { return d.x1 - d.x0; })
        .attr('height', function(d) { return d.y1 - d.y0; })
    
        g.select('text').select('tspan').text(d=> d.data.name)

    var rec = g.enter()
        .append('g')
        .attr('transform', function(d) {
          return 'translate(' + [d.x0, d.y0] + ')'
        })
    
        rec.append('rect')
        .attr('data-name', d=> d.data.name)
        .attr('data-category', d=> d.data.category)
        .attr('data-value', d=> d.data.value)
        .style('stroke','white')
        .style('fill', d => colors(arrayNames.indexOf(d.data.category)))
        .attr('width', function(d) { return d.x1 - d.x0; })
        .attr('height', function(d) { return d.y1 - d.y0; })
        .on('mousemove', function(d) {
          const browserWidth = document.querySelector( 'html' ).clientWidth;
          const browserHeight = document.querySelector( 'html' ).clientHeight;
          tree_tooltip.html('<b>Name:</b> ' + d.data.name + '<br>' +
                       '<b>Category:</b> ' + d.data.category + '<br>' +
                       '<b>Value:</b> $' + getValue(d.data.value) +' Mil')
                .style('opacity',.9)
                .style('left', d3.event.pageX < browserWidth/2 ? d3.event.pageX + 20 + 'px': d3.event.pageX - 220 + 'px' )
                .style('top', d3.event.pageY > browserHeight-70 ? d3.event.pageY - 50 + 'px': d3.event.pageY + 'px' )
                .attr('data-value', d.data.value)
        })
        .on('mouseout', function(d) {
          tree_tooltip.style('opacity',0)
        }) 
    
        rec.append('text').append('tspan')
        .attr('class','tree_text')
        .attr('x', 4)
        .attr('dy', 14)
        .style('font-size','12px')
        .text(d=> d.data.name)
    
    
    /* legend */
    var leg = d3.select('.tree_legend')
        .selectAll('g').data(data.children);
    
    leg.exit().remove();
    
    leg.style('background', (d,i)=> colors(i))
      .select('text').text(d=> d.name)
    
    leg.enter().append('g')
      .style('background', (d,i)=> colors(i))
      .style('border', '1px solid white')
      .style('padding','0 10px')
      .style('display','inline-block')
      .append('text').text(d=> d.name)
      .style('text-shadow','0px 0px 1px white')
      .style('font-size', '12px')
    
  })
}