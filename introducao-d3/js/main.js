var barChart;
var bubbleChart;

d3.csv('data/ies_2011.csv', function(error, data) {

  var dataset = format(data);

  var categoriaGroupBy = d3.nest()
    .key(function(d) { return d.categoria; })
    .rollup(function(d) { return d.length; })
    .entries(dataset);

  var redeGroupBy = d3.nest()
    .key(function(d) { return d.rede; })
    .rollup(function(d) { return d.length; })
    .entries(dataset);

  var admGroupBy = d3.nest()
    .key(function(d) { return d.administracao; })
    .rollup(function(d) { return d.length; })
    .entries(dataset);

  var tipoAdmGroupBy = d3.nest()
    .key(function(d) { return d.tipo_adm; })
    .rollup(function(d) { return d.length; })
    .entries(dataset);


  barChart = new BarChart('#bar-chart', tipoAdmGroupBy);
  bubbleChart = new BubbleChart('#bubble-chart', tipoAdmGroupBy);
  console.log(categoriaGroupBy);
  console.log(redeGroupBy);
  console.log(admGroupBy);
  console.log(tipoAdmGroupBy);

});

function sort() {

  var value = d3.select("#sort-menu").node().value;
  console.log(value);
  barChart.sort(value);
  bubbleChart.sort(value);
}

function format(data) {

  var dataset = [];

  for (var i = 0; i < data.length; i++) {

    dataset.push({
      nome: data[i].NO_IES,
      sigla: data[i].SG_IES,
      categoria: data[i].NOMEORG,
      regiao: data[i].REGIAOIES,
      estado: data[i].NOMEUFIES,
      uf: data[i].SIGLA,
      municipio: data[i].MUNICIPIOIES,
      local: data[i].LOCALIES,
      rede: data[i].REDE,
      administracao: data[i].DEPADM,
      tipo_adm: data[i].DEPADM5,
      mantenedora: data[i].MANTENEDORA
    });
  }

  return dataset;

}
