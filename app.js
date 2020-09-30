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

chart
  .append("g")
  .call(bottomAxis.tickSizeOuter(0))
  .attr("color", "#720570")
  .attr("transform", `translate(0, ${CHART_HEIGHT})`);

chart
  .selectAll(".bar")
  .data(DUMMY_DATA, (data) => data)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", xScale.bandwidth())
  .attr("height", (data) => CHART_HEIGHT - yScale(data.value))
  .attr("x", (data) => xScale(data.region))
  .attr("y", (data) => yScale(data.value));

chart
  .selectAll(".label")
  .data(DUMMY_DATA)
  .enter()
  .append("text")
  .classed("label", true)
  .text((data) => data.value)
  .attr("x", (data) => xScale(data.region) + xScale.bandwidth() / 2)
  .attr("y", (data) => yScale(data.value) - 20)
  .attr("text-anchor", "middle");
