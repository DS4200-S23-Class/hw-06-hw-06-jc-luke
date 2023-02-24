// JS File for Homework 6: D3 Brushing & Linking
// Luke Abbatessa and Jocelyn Ju
// Last Modified 02.23.2023

// Instantiate visualization dimensions/limitations
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 







// barplot 

// Create a frame for the bar plot
const FRAME2 = d3.select("#barchart") 
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
	FRAME2.append("g")
		 .attr("transform", "translate(" + MARGINS.left + 
		  "," + (VIS_HEIGHT+ MARGINS.bottom) + ")")
		 .call(d3.axisBottom(xSCALE))
		 .selectAll("text")
		   .attr("font-size", '10px');

	// Create the y-axis
	FRAME2.append("g")
	   .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
		 .call(d3.axisLeft(ySCALE_REV))
		 .selectAll("text")
		   .attr("font-size", '10px');

	// Create the bars and add event listeners

	FRAME2.selectAll("bar")
	  .data(data)
	  .enter()
	  .append("rect")
	    .attr("x", function(d) { return xSCALE(d.Species) + MARGINS.left; })
	    .attr("y", function(d) { return ySCALE_REV(50) + MARGINS.top; })
	    .attr("width", BAR_WIDTH)
	    .attr("height", function(d) { return VIS_HEIGHT - ySCALE_REV(50); })
	});





