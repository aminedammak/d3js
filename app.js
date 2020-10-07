const DUMMY_DATA = [
  { id: "d1", value: 10, region: "USA" },
  { id: "d2", value: 11, region: "India" },
  { id: "d3", value: 12, region: "China" },
  { id: "d4", value: 6, region: "Germany" },
];

const MARGIN_VERTICAL = 30;
const MARGIN_HORIZONTAL = 20;

const CHART_WIDTH = 600 - MARGIN_HORIZONTAL * 2;
const CHART_HEIGHT = 450 - MARGIN_VERTICAL * 2;

const xScale = d3
  .scaleBand()
  .range([0, CHART_WIDTH])
  .domain(DUMMY_DATA.map((item) => item.region))
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  .rangeRound([CHART_HEIGHT, 0])
  .domain([0, d3.max(DUMMY_DATA, (data) => data.value) + 3]);

const bottomAxis = d3.axisBottom(xScale);

const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH + MARGIN_HORIZONTAL * 2)
  .attr("height", CHART_HEIGHT + MARGIN_VERTICAL * 2);

const chart = chartContainer.append("g");

//x axis with countries name
chart
  .append("g")
  .call(bottomAxis.tickSizeOuter(0))
  .attr("color", "#720570")
  .attr("transform", `translate(0, ${CHART_HEIGHT})`);

let dataToRender = DUMMY_DATA;

//bars
const renderCharts = () => {
  console.log("dataToRender", dataToRender);

  chart
    .selectAll(".bar")
    .data(dataToRender, (data) => data.id)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth())
    .attr("height", (data) => CHART_HEIGHT - yScale(data.value))
    .attr("x", (data) => xScale(data.region))
    .attr("y", (data) => yScale(data.value));

  chart
    .selectAll(".bar")
    .data(dataToRender, (data) => data.id)
    .exit()
    .remove();

  //values above bars
  chart
    .selectAll(".label")
    .data(dataToRender, (data) => data.id)
    .enter()
    .append("text")
    .classed("label", true)
    .text((data) => data.value)
    .attr("x", (data) => xScale(data.region) + xScale.bandwidth() / 2)
    .attr("y", (data) => yScale(data.value) - 20)
    .attr("text-anchor", "middle");

  //handle remove values
  chart
    .selectAll(".label")
    .data(dataToRender, (data) => data.id)
    .exit()
    .remove();
};
renderCharts();

//checkboxes
let unselectedItemsIds = [];

const dataItems = d3.select("#data").select("ul").selectAll("li");

dataItems
  .data(dataToRender, (data) => data.id)
  .enter()
  .append("li")
  .append("input")
  .attr("type", "checkbox")
  .attr("checked", true)
  .on("change", (data) => {
    if (unselectedItemsIds.indexOf(data.id) === -1) {
      unselectedItemsIds.push(data.id);
    } else {
      unselectedItemsIds = unselectedItemsIds.filter((id) => id !== data.id);
    }
    dataToRender = DUMMY_DATA.filter(
      (data) => unselectedItemsIds.indexOf(data.id) === -1
    );
    renderCharts();
  });
