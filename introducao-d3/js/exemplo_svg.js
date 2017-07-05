var svg = d3.select('#svg-example').append('svg')
  .attr('width', 640)   // largura
  .attr('height', 480)  // Altura
  .style('background-color', "#404040")
  .style('margin-left', "40px")
.append('g')            // Agrupa elementos
  .attr('transform', 'translate(' + 20 + "," + 20 + ')');

svg.append('rect')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', 0) // Define a posição do elemento na tela
  .attr('y', 0)
  .attr('fill', '#00D9FB'); // Cor de preenchimento do elemento

svg.append('circle')
  .attr('r', 25)
  .attr('cx', 100)
  .attr('cy', 25)
  .attr('fill', '#0ABF04');

svg.append('text')
  .attr('font-size', 28)
  .attr('x', 150)
  .attr('y', 25)
  .attr('dy', 7)  // Deslocamento referente ao ponto Y
  .attr('fill', '#FFFFFF')
  .text("I ❤ InfoVis");


/*
* Observem o SVG gerado dentro HTML
  <svg width="640" height="480">
      <g transform="translate(20,20)">
          <rect width="50" height="50" x="0" y="0" fill="#00D9FB"></rect>
          <circle r="25" cx="100" cy="25" fill="#0ABF04"></circle>
          <text font-size="28" x="150" y="25" dy="7" fill="#FFFFFF">I ❤ InfoVis</text>
      </g>
  </svg>
*/
