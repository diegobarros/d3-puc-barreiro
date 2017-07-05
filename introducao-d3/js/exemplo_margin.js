
var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 640 - margin.left - margin.right;
var height = 480 - margin.top - margin.bottom;

var svg = d3.select('#margin-example').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', "#404040")
.append('g')
  .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');

var data = ['A', 'E', 'I', 'O', 'U'];
var colors = ['#00E7FF','#00FCDB','#57FB9F','#98FB63','#FFE800'];

var x = d3.scaleBand()
  .domain(data)
  .range([0, width]);

var color = d3.scaleOrdinal()
    .domain(data)
    .range(colors);

var letters = svg.selectAll('text')
  .data(data);

  letters.enter().append('rect')
    .attr('width', 50)
    .attr('height', 50)
    .attr('x', function(d) { return x(d); })
    .attr('fill', function(d) { return color(d); });

  letters.enter().append('text')
    .attr('font-size', "12pt")
    .attr('x', function(d) { return x(d); })
    .attr('dx', 20)
    .attr('dy', 29)
    .attr('fill', "#333")
    .text(function(d) { return d; });
