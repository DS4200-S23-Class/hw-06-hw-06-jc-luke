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
<<<<<<< HEAD
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
  let myPoints = FRAME2.append("g")
  	.selectAll("points")
=======
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
  	let myPoints = FRAME2.append("g")
  		.selectAll("points")
      	.data(data) // Passed from .then  
      	.enter()       
	      	.append("circle")
	      	  .attr("id", (d) => { return ("(" + d.Sepal_Width + ", " + d.Petal_Width + ")"); })
	      	  .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
	          .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
	          .attr("r", 5)
	          .attr("fill", (d) => { return COLOR(d.Species); })
	          .style("opacity", 0.5);


	function updatePlot(event) {
		coords = event.selection
		myPoints.classed("selectedpt", function(d){ return isInBrush(coords, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width))})
	}

	function isInBrush(coords, cx, cy) {
		let x0 = coords[0][0],
			x1 = coords[1][0],
			y0 = coords[0][1],
			y1 = coords[1][1]; 

		return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
			}

	FRAME2.call( d3.brush()
           .extent( [ [0,0], [FRAME_WIDTH, FRAME_HEIGHT] ])
           .on("start brush", updatePlot))
>>>>>>> b5872146b8afd8637e14e3d186c7fe6b7f156565
      .data(data) // Passed from .then  
      .enter()       
	      .append("circle")
	      	 .attr("id", (d) => { return ("(" + d.Sepal_Width + ", " + d.Petal_Width + ")"); })
	      	 .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
	         .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
	         .attr("r", 5)
	         .attr("fill", (d) => { return COLOR(d.Species); })
	         .style("opacity", 0.5)

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

	// Add brushing
  FRAME2.call( d3.brush()
          .extent( [ [0,0], [VIS_WIDTH,VIS_HEIGHT] ] )
          .on("start brush", updateChart)
        )

  // Function that is triggered when brushing is performed
  function updateChart(event) {
    extent = event.selection
    myPoints.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width) ) } )
  }

  // A function that returns TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
        let x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1]; 
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }

})

// barplot 

// Create a frame for the bar plot
const FRAME3 = d3.select("#barchart") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");


// Read data and create a barplot, hard-coded for this data
d3.csv("data/iris.csv").then((data) => { 

	const ySCALE_REV = d3.scaleLinear() 
	                   .domain([0, 50])  
	                   .range([VIS_HEIGHT, 0]);


	const xSCALE = d3.scaleBand()
						.range([ 0, VIS_WIDTH ])
						.domain(data.map(function(d) { return d.Species; }))
						.padding(0.3);

	const BAR_WIDTH = 60;

	// Create the x-axis
	FRAME3.append("g")
		 .attr("transform", "translate(" + MARGINS.left + 
		  "," + (VIS_HEIGHT+ MARGINS.bottom) + ")")
		 .call(d3.axisBottom(xSCALE))
		 .selectAll("text")
		   .attr("font-size", '10px');

	// Create the y-axis
	FRAME3.append("g")
	   .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
		 .call(d3.axisLeft(ySCALE_REV))
		 .selectAll("text")
		   .attr("font-size", '10px');

	// Create the bars 
	FRAME3.selectAll("bar")
	  .data(data)
	  .enter()
	  .append("rect")
	    .attr("x", function(d) { return xSCALE(d.Species) + MARGINS.left; })
	    .attr("y", function(d) { return ySCALE_REV(50) + MARGINS.top; })
	    .attr("width", BAR_WIDTH)
	    .attr("fill", (d) => { return COLOR(d.Species); })
	    .attr("height", function(d) { return VIS_HEIGHT - ySCALE_REV(50); })
	});
