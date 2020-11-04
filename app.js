var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(StateData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    StateData.forEach(function(data) {
      data.age = +data.age;
      data.obesity = +data.obesity;
      data.abbr = data.abbr
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(StateData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([15, d3.max(StateData, d => d.obesity)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    chartGroup.selectAll(".stateCircle")
    .data(StateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "12")
    .classed("stateCircle", true)
    .attr("opacity", ".8");
   

//    TRY ADDING LABELS TO CIRCLES
// **************************************
    chartGroup.selectAll(".stateText")
    .data(StateData)
    .enter()
    .append("text")
    .text(d => {return d.abbr})
    .classed("stateText", true)
    .attr("dx", d => xLinearScale(d.age))
    .attr("dy", d => yLinearScale(d.obesity))
    .attr("font-size", "10px")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    
  
    

    // .attr("r", "15")
    // .attr("fill", "pink")
    // .attr("opacity", ".5");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("aText", true)
      // .attr("class", "axisText")
      .text("OBESITY");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .classed("aText", true)
      .text("AGE");
  }).catch(function(error) {
    console.log(error);
  });
