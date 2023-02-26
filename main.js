// JS File for Homework 6: D3 Brushing & Linking
// Luke Abbatessa and Jocelyn Ju
// Last Modified 02.26.2023

// Instantiate visualization dimensions/limitations
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Assign a color to each species
const COLOR = d3.scaleOrdinal()
                   .domain(["setosa", "versicolor", "virginica" ])
                   .range([ "#00BA38", "#F8766D", "#619CFF"]);

// Create a frame for the first scatter plot
const FRAME1 = d3.select("#length-scatter")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Read data and create the scatter plot
d3.csv("data/iris.csv").then((data) => {

	// Find max X
  	const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

  	// Define scale functions that maps our data values 
  	// (domain) to pixel values (range)
  	const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, (MAX_X1 + 1)]) // Add some padding  
                      .range([0, VIS_WIDTH]);

    // Find max Y
  	const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

  	// Define scale functions that maps our data values 
  	// (domain) to pixel values (range)
  	const Y_SCALE1 = d3.scaleLinear() 
                      .domain([0, (MAX_Y1 + 1)]) // Add some padding  
                      .range([VIS_HEIGHT, 0]);

    // Use X_SCALE1 and Y_SCALE1 to plot points
  	FRAME1.selectAll("points")  
      	.data(data) // Passed from .then  
      	.enter()       
      	.append("circle")
      	  .attr("id", (d) => { return ("(" + d.Sepal_Length + ", " + d.Petal_Length + ")"); })
      	  .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.top); }) 
          .attr("r", 5)
          .attr("fill", (d) => { return COLOR(d.Species); })
          .style("opacity", 0.5);

    // Add an x-axis to the vis  
  	FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE1).ticks(8)) 
            .attr("font-size", '10px');

    // Add a y-axis to the vis
  	FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.top + 
                "," + MARGINS.left + ")") 
          .call(d3.axisLeft(Y_SCALE1).ticks(14)) 
            .attr("font-size", '10px');

});


// Create a frame for the first scatter plot
const FRAME2 = d3.select("#width-scatter")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Read data and create the scatter plot
d3.csv("data/iris.csv").then((data) => {

	// Find max X
  	const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });

  	// Define scale functions that maps our data values 
  	// (domain) to pixel values (range)
  	const X_SCALE2 = d3.scaleLinear() 
                      .domain([0, (MAX_X2 + 1)]) // Add some padding  
                      .range([0, VIS_WIDTH]);

    // Find max Y
  	const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

  	// Define scale functions that maps our data values 
  	// (domain) to pixel values (range)
  	const Y_SCALE2 = d3.scaleLinear() 
                      .domain([0, (MAX_Y2 + 1)]) // Add some padding  
                      .range([VIS_HEIGHT, 0]);

    // Use X_SCALE2 and Y_SCALE2 to plot points
  	FRAME2.selectAll("points")  
      	.data(data) // Passed from .then  
      	.enter()       
      	.append("circle")
      	  .attr("id", (d) => { return ("(" + d.Sepal_Width + ", " + d.Petal_Width + ")"); })
      	  .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
          .attr("r", 5)
          .attr("fill", (d) => { return COLOR(d.Species); })
          .style("opacity", 0.5);

    // Add an x-axis to the vis  
  	FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE2).ticks(10)) 
            .attr("font-size", '10px');

    // Add a y-axis to the vis
  	FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.top + 
                "," + MARGINS.left + ")") 
          .call(d3.axisLeft(Y_SCALE2).ticks(15)) 
            .attr("font-size", '10px');

});