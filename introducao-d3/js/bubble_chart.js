/**
* Cria um novo gráfico de barras
* container - seletor do elemento DOM que receberá o gráfico
* data - vetor contendo os dados que serão visualizados
*/
var BubbleChart = function(container, data) {
  // Margem interna do SVG
  // Veja: https://bl.ocks.org/mbostock/3019563
  this.margin = {top: 50, right: 10, bottom: 60, left: 40};
  // Largura e altura da imagem SVG
  // bserve que subtraímos o valor das margens em cada dimensão, porém,
  // adicionamos novamente quando criamos o SVG.
  this.width = 640 - this.margin.left - this.margin.top;
  this.height = 480 - this.margin.right - this.margin.bottom;

  // Cria uma imagem svg vazia no documento html selecionado pela variável container
  this.svg = d3.select(container).append('svg')
      .attr("width", this.width + this.margin.left + this.margin.top)
      .attr("height", this.height + this.margin.right + this.margin.bottom)
    .append("g")  // Cria a margem do SVG agrupando todo os elementos nos limites dela
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      // O transform vai mover todos os itens dentro da margem (tag g) através do
      // valor passado para X e Y, no caso, margem esquerda e margem direita.

  /** Escalas x e y do gráfico
  * escala x será ordinal devido os dados serem textuais categóricos
  * escala y será linear devido os dados serem numéricos
  * Escalas contínuas = https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales
  * Escalas ordinais =  https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales
  * Não se esqueça: as escalas podem ser usadas não só para a medição dos eixos do gráfico
  * como também para posicionar elementos dentro do SVG e alterar sem tamanho. Sobre tamanho
  * temos o exemplo clássico do valor da área do círculo ser proporcional ao valor dos dados.
  */
  this.x = d3.scalePoint()
    .rangeRound([0, this.width])
    .padding(0.2); // Espaçamento entre as barras. Remova e veja o que acontece

  this.y = d3.scaleLinear()
    .range([this.height, 0]);

  // Eixos x e y do gráfico.
  // O próprio d3 desenha o eixo, basta mexer no css depois
  this.xAxis = d3.axisBottom(this.x); // Passe as respectivas escalas como parâmetro
  this.yAxis = d3.axisLeft(this.y);

  // Cores da visualização

  // Paleta padrão do d3
  this.pallete = d3.schemeCategory10;

  // Usaremos uma escala ordinal para determinar dinâmicamente a cor de cada item
  // O range será nossa paleta e o domínio um vetor com o dado correspondete a cada cor da paleta
  // O d3 vai associar por posição, então basta usar passar o dado que ele retorna a cor.
  this.color = d3.scaleOrdinal()
    .range(this.pallete);

  // Após configurar os atributos principais criamos a visualização
  this.update(data);

};

// Sobre o padrão e atualização do d3js veja:
// https://bl.ocks.org/mbostock/3808234
BubbleChart.prototype.update = function(data) {
  /**
  * Configura o domínio dos dados nas respectivas escalas.
  * Na escala x o domínio serão os nomes das categorias
  * certifique-se sempre de que os elementos do vetor sejam únicos.
  * A função map neste caso simplesmente retorna um vetor contendo
  * o nome de cada item da variável KEY.
  * Exprimente depois:
  * var dominio = data.map(function(d) { return d.key; });
  * console.log(dominio);
  */
  this.x.domain(data.map(function(d) { return d.key; }));
  /**
  * Na escala y a história será um pouco diferente...
  * Por se tratar de dados numéricos nosso domínio terá os valores
  * máximo e mínimo. Para o gráfico de barras teremos então
  * um vetor com min = 0 e max = o maior valor dos dados;
  * Alguns detalhes:
  * - Estamos passando um vetor de duas posições [min, max] para o domínio
  * - Para achar o valor máximo do vetor usaremos d3.max
  */
  this.y.domain([0, d3.max(data, function(d) { return d.value; })]);
  // Domínio das cores é o mesmo caso do domínio de Y
  this.color.domain(data.map(function(d) { return d.key; }));

  this.data = data;

  // JOIN: Acrescenta novos dados aos elementos antigos
  var bubbles = this.svg.selectAll(".bubble")
    .data(data, function(d) { return d.key; });

  // ENTER: Entra com os novos elementos presentes nos novos dados
  // Adiciona as barras
  bubbles.enter().append("circle")
    .attr("class", "bubble")
    .attr("fill", (function(d){ return this.color(d.key); }).bind(this))  // bind serve para usar o this dentro função
    .attr("cx",(function(d) { return this.x(d.key); }).bind(this))         // ( ... ).bind(this) cuidado com parênteses
    .attr("cy", (function(d) { return this.y(d.value); }).bind(this))
    //.attr("width", this.x.bandwidth())                                    // bandwidth obtém a largura proporcional das barras
    .attr("r", (function(d) {
      var area = d.value;
      return Math.sqrt((area / Math.PI));
    }).bind(this));

  // Adiciona os eixos do gráfico
  this.svg.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);

  this.svg.append("g")
      .attr("class", "axis y")
      .call(this.yAxis);
};


BubbleChart.prototype.sort = function(order) {

  var t = d3.transition()
      .duration(750);

  var delay = function(d, i) { return i * 50; };

  switch (order) {
    case "ASC":
      this.data.sort(function(a, b) { return a.value < b.value; });
      break;
    case "DSC":
      this.data.sort(function(a, b) { return a.value > b.value; });
      break;
    default:

  }

  var x0 = this.x.domain(this.data.map(function(d) { return d.key; })).copy();

  this.svg.transition(t).selectAll('.bubble')
    .delay(delay)
    .attr("cx", function(d) { return x0(d.key); });

  this.svg.transition(t).select('.x.axis')
    .call(this.xAxis)
  .selectAll("g")
    .delay(delay);

};
