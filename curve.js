// const data = [
//   {
//     date: "2007-05-20",
//     close: 50.98,
//     lower: 93.21,
//     middle: 103.79,
//     upper: 114.38,
//   },
//   {
//     date: "2007-05-21",
//     close: 113.54,
//     lower: 94.59,
//     middle: 104.81,
//     upper: 115.02,
//   },
//   {
//     date: "2007-05-22",
//     close: 112.89,
//     lower: 95.89,
//     middle: 105.68,
//     upper: 115.48,
//   },
//   {
//     date: "2007-05-23",
//     close: 10.69,
//     lower: 96.79,
//     middle: 106.28,
//     upper: 115.76,
//   },
//   {
//     date: "2007-05-24",
//     close: 113.62,
//     lower: 97.43,
//     middle: 106.96,
//     upper: 116.49,
//   },
//   {
//     date: "2007-05-28",
//     close: 114.35,
//     lower: 98.24,
//     middle: 107.69,
//     upper: 117.14,
//   },
// ];

const parseTime = d3.timeParse("%Y-%m-%d");
const dateFormat = d3.timeFormat("%Y-%m-%d");

const margin = { top: 20, right: 30, bottom: 30, left: 60 },
  width =
    document.getElementById("container").offsetWidth * 0.95 -
    margin.left -
    margin.right,
  height = 400 - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, width]);

const y = d3.scaleLinear().range([height, 0]);
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("id", "svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.close));

// On demande à D3JS de charger notre fichier
// On déclare également une map qui servira un peu plus bas pour l'affichage du tooltip
var map = {};
let data = [
  { date: "2008-01-08", close: "5495.67", volume: "7641948" },
  { date: "2008-01-09", close: "5435.42", volume: "8601614" },
  { date: "2008-01-12", close: "5400.43", volume: "7106020" },
];

// Conversion des données du fichier, parsing des dates et '+' pour expliciter une valeur numérique.
data.forEach(function (d) {
  d.date = parseTime(d.date);
  d.close = +d.close;
  d.volume = +d.volume;
  map[d.date] = d; // sauvegarde sous forme de hashmap de nos données.
});

// Contrairement au tutoriel Bar Chart, plutôt que de prendre un range entre 0 et le max on demande
// directement à D3JS de nous donner le min et le max avec la fonction 'd3.extent', pour la date comme
// pour le cours de fermeture (close).
x.domain(d3.extent(data, (d) => d.date));
y.domain(d3.extent(data, (d) => d.close));

// Ajout de l'axe X
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Ajout de l'axe Y et du texte associé pour la légende
svg
  .append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .style("text-anchor", "end")
  .text("Pts");

// Ajout de la grille horizontale (pour l'axe Y donc). Pour chaque tiret (ticks), on ajoute une ligne qui va
// de la gauche à la droite du graphique et qui se situe à la bonne hauteur.
svg
  .selectAll("y axis")
  .data(y.ticks(10))
  .enter()
  .append("line")
  .attr("class", "horizontalGrid")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", (d) => y(d))
  .attr("y2", (d) => y(d));

// Ajout d'un path calculé par la fonction line à partir des données de notre fichier.
svg.append("path").datum(data).attr("class", "line").attr("d", line);

// const xa = d3
//   .scaleTime()
//   .domain(d3.extent(data, (d) => parser(d.date)))
//   //   .domain([2007 - 05 - 20, 2007 - 05 - 28])
//   .range([0, 600]);

// const height = 400;
// const width = 600;

// const ya = d3
//   .scaleLinear()
//   .domain([0, d3.max(data, (d) => d.upper)])
//   .range([400, 00]);

// const svg = d3.select("svg");

// svg.attr("height", height).attr("width", width);

// const curve = svg
//   .selectAll("g")
//   .data([""])
//   .enter()
//   .append("g")
//   .selectAll("path")
//   .data([""])
//   .enter()
//   .append("path");

// const line = d3
//   .line()
//   .x((d) => xa(d.date))
//   .y((d) => ya(d.close));

// curve.attr("d", line(data));
// curve.attr("fill", "none");
// curve.attr("stroke", "steelblue");
// curve.attr("stroke-width", "1.5");
// curve.attr("stroke-miterlimit", "1");
