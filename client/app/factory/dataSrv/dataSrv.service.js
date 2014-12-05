'use strict';

angular.module('serveMeApp')
  .service('dataSrv',['$rootScope', function ($rootScope) {

	
	// Construction of reusable table function in d3 chart object	
	// *********************Table******************************
	if (!d3.chart) d3.chart = {};
	d3.chart.table   = function (addColumn){ 
		var data,width;
		//reusable chart pattern
		function chart (container){
			//initialization code

			//append dynamic table with responsive bootstrap into container div 
			var table = container.append("table").classed("table table-bordred table-striped",true);
			//append thead to table
			var thead = table.append('thead');
			//append tbody to table
			var tbody = table.append('tbody');
			//selectAll rows with with data to tbody element, use selectAll as this are dynamic entries and non exisyent till now.
			var rows = tbody.selectAll("tr").data(data);
			//create all dynamic rows with enter() command
			var rowsEnter = rows.enter()
			.append("tr");
			//Create columns with cell data in each row --column-1
			addColumn(rowsEnter);
			//exit() method to adjust automatic row removal
			rows.exit().remove();
		 };
		//grab data
		chart.data  = function(value){
		 	if(!arguments.length) return data;
		 	data = value;
		 	return chart;
		 };
		//width function 
		chart.width = function(value){
		  if(!arguments.length) return width;
		 	width = value;
		 	return chart;
		 };
		 //return chart function as the condition of reusable chart pattern
		
		return chart;
     };
	d3.chart.scatter = function (){
		var g,data;
		var width = 400, height = 400;

		//reusable chart pattern
		function chart (container){
			//initialization code
			g = container;
			
			var maxScore 	= d3.max(data,function(d){return d.data.score});

			var yScale	= d3.scale.linear()
			.domain([0,maxScore])
			.range([0,height]);

			var xScale  = d3.scale.ordinal()
			.domain(d3.range(data.length))
			.rangeBands([1,611],0.64);

			var g = g.append("g")
			.attr({"transform":"translate(27,50)"})

			var circles = g.selectAll("circle")
			.data(data);

			circles.enter()
			.append("circle");	

			circles.attr({
				cx:function(d,i){return xScale(i)},
				cy:function(d,i){return yScale(d.data.score)},
				r:10
			})
		 };
		//grab data
		chart.data   = function(value){
		 	if(!arguments.length) return data;
		 	data = value;
		 	return chart;
		 };
		chart.width  = function(value){
		 	if(!arguments.length) return width;
		 	width = value;
		 	return chart;
		 };
		chart.height = function(value){
		  if(!arguments.length) return height;
		 	height = value;
		 	return chart;
		 };
		 //return chart function as the condition of reusable chart pattern
		
		return chart;
	 }; 
 	d3.chart.brush 	 = function (){
    	var  g;
    	var data;
    	var width = 600;
    	var height = 30;

    	function chart (container) {
    		g = container;
    		var maxScore = d3.max(data,function(d){return d.data.score});
    		var yScale = d3.scale.linear();

    		var extent = d3.extent(data, function(d){
    			return d.data.created
    		 });
			var scale = d3.scale.linear()
				.domain(extent)
				.range([0,width]);
			// var color = d3.time.scale()
			// 	.domain(d3.extent(data,function(d){return d.data.score}))
			// 	.range(["#3D3DF7","#F81A1A"])
			// 	.interpolate(d3.interpolateHsl);	

			//Generate brush			
			var brush = d3.svg.brush();	
			brush.x(scale);
			brush(g);

			// g.attr("transform","trabslate(50,100)")
			g.selectAll("rect").attr("height",height);
			g.selectAll("background")
			 .style({fill :"#4B9E9E",visibility:"visible"})
			g.selectAll("extent")
			 .style({fill :"#78C5C5",visibility:"visible"})
			g.selectAll(".resize rect")
			 .style({fill :"#276C86",visibility:"visible"})  

			var rects = g.selectAll("rect.events")
			.data(data) 
			rects.enter()
			.append("rect").classed("events",true);

			rects.attr({
				x:function(d){return scale(d.data.created)},
				y:0,
				width:1,
				height:height
			 }).style("pointer-events","none"); 

			rects.exit().remove();

			brush.on("brushend",function(){
				var ext = brush.extent();
				var filtered = data.filter(function(d){
					return (d.data.created > ext[0] && d.data.created < ext[1]);
				 });
				g.selectAll("rect.events")
				.style({"stroke":"#fff"});

				g.selectAll("rects.events")
				.data(filtered,function(d){return d.data.id})
				.style({
					// stroke:function(d){return color(d.data.score)}
					stroke:"#fff"
				 });
			 });
    	 }
		chart.data   = function(value){
		 	if(!arguments.length) return data;
		 	data = value;
		 	return chart;
		 };
		chart.width  = function(value){
		 	if(!arguments.length) return width;
		 	width = value;
		 	return chart;
		 };
		chart.height = function(value){
		  if(!arguments.length) return height;
		 	height = value;
		 	return chart;
		 };
		 
		//return chart function as the condition of reusable chart pattern
		return chart;
     };

    // ######################## Calling d3 reusable chart functions ################################## 
	//make json or api call to get the data and run reusable chart functions,charts such as Table,scatter plot, histogram

	$rootScope.tableDisplay 	  = function (url,dataType,targetDiv,prepareData,addColumn){
	 var data = '';	

	 if(dataType == "JSON"){
	   d3.json(url,function(err,payload){
		  // capture data in a avariable		
		  data = prepareData(payload);
		 });
	  } else if (dataType == "CSV"){

		 	
		 }   
	   setTimeout(function(){
			//build table using d3.chart.table function
			//parent Div where table will be inserted
			var display = d3.select(targetDiv);
			//table container
			var tdiv = display.append("div").classed("table-responsive",true);
			//instantiate chart function
			var table = d3.chart.table(addColumn);
			//set Data to table
			table.data(data);
			//render table
			table(tdiv);		
		 },200)
	  };
	$rootScope.scatterPlotDisplay = function (url,dataType,targetDiv,prepareData){
	 var data = '';	

	 if(dataType == "JSON"){
	   d3.json(url,function(err,payload){
		  // capture data in a avariable		
		  data = prepareData(payload);
		 });
	  } else if (dataType == "CSV"){

		 	
		 }   
	   setTimeout(function(){
		 var svg = d3.select(targetDiv)
		 //scatter plot
		 var sgroup = svg.append("g");
		 var scatter = d3.chart.scatter();
		 // console.log("check data ", data);
		 scatter.data(data);
		 scatter(sgroup);	
		},200)
	  };
	$rootScope.brushDisplay = function (url,dataType,targetDiv,prepareData){
	 var data = '';	

	 if(dataType == "JSON"){
	   d3.json(url,function(err,payload){
		  // capture data in a avariable		
		  data = prepareData(payload);
		 });
	  } else if (dataType == "CSV"){

		 	
		 }   


	   setTimeout(function(){
		 var svg = d3.select(targetDiv)
		 //scatter plot
		 var bgroup = svg.append("g");
		 var brush  = d3.chart.brush();
		 brush.data(data);
		 brush(bgroup);	
		},200)
	  };  

	// *********************Histogram******************************
	$rootScope.histogram          = function(){ 
		//histogram layout with reddit data json
		d3.json('assets/dataDir/data.json',function(err,pics){
		 var data = pics.data.children; 
		 // var data 	= [10,22,33,11,44,55,33,30,11,66];
		 var histogram = d3.layout.histogram()
		 	.value(function(d){ return d.data.score ;})
		 	// .range([d3.min(data.data.score),d3.max(data.data.score)])
		 	.bins(20);

		 var layoutDy = histogram(data);

		 var svgTop = d3.select("#svg2");

		 svgTop.selectAll('div')
		 .data(layoutDy)
		 .enter().append("rect").classed("histBar", true)
		 .attr({
		 	x: function(d,i){
		 		return 150+i * 30;
		 	},
		 	y:50,
		 	width:20,
		 	height:function(d){
		 		return 20 * d.length;
		 	}
		 	})
		 .style({
				fill  : "steelblue"
			})

		 });
	 };	


	// *********************BAR CHARTS******************************


	// *******Chart configuration***********	
	// var margin = {top: 20, right: 50, bottom: 80, left: 50},
	// 	width =	 960 - margin.left - margin.right,
	// 	height = 500 - margin.top - margin.bottom;
	// //Define scale first
	// var x = d3.scale.ordinal().rangeRoundBands([0,width],.75);	
	// var y = d3.scale.linear().range([height,100]);
	// //insert scales to appropriate axis 	
	// var xAxis = d3.svg.axis()
	// 	.scale(x)
	// 	.orient("bottom")
	// var yAxis = d3.svg.axis()
	// 	.scale(y)
	// 	.orient("left");

	// //create chart in any svg container		
	// var chart = d3.select("#svg1")
	// 	.attr("width",width + margin.left + margin.right)
	// 	.attr("height",height + margin.top +margin.bottom)
	// 	.append("g")
	// 	.attr("transform","translate(" + margin.right + "," + margin.top + ")");  //This is used for creating the margin for axises
		
	// function type(d) {
 //  	  d.value = +d.value; // coerce to number
 //  	  return d;
	//  };	


	// **************load data from csv*************************	
	// d3.csv("assets/dataDir/data.csv",type,function(error,data){
	// 	// console.log(data);
	// 	//define domain with data range
	// 	x.domain(data.map(function(d) { return d.name; }));
	// 	y.domain([0, d3.max(data, function(d) { return d.value; })]);
	// 	//append and call xAxis to display xAxis
	// 	chart.append("g")
	// 	 .attr("class", "x axis")
	// 	 .attr("transform", "translate(0," + height + ")")
	// 	 .call(xAxis);

	// 	//append and call yAxis to display yAxis 
	// 	chart.append("g")
	// 	  .attr("class", "y axis")
	// 	  .call(yAxis)
	// 	  .append("text")
	// 	  .attr("transform","rotate(-90)")
	// 	  .attr("y",5)
	// 	  .attr("dy",".71em")
	// 	  .style("text-anchor","end")
	// 	  .text("information");

	// 	// insert data and bind to virtual elements for bar charts  
	// 	chart.selectAll(".bar")
	// 	.data(data)
	// 	.enter().append("rect")
	// 	  .attr("class", "bar")
	// 	  .attr("x", function(d) { return x(d.name); })
	// 	  .attr("y", function(d) { return y(d.value); })
	// 	  .attr("height", function(d) { return height - y(d.value); })
	// 	  .attr("width", x.rangeBand());
	//  });
	
	// // **************load data from Static JSON*****************	
	// d3.json('assets/dataDir/data.json',function(err,pics){
	//   var data = pics.data.children;

	//   	console.log(data); 

	//   //define domain with data range
	// 	x.domain(data.map(function(d) { return d.data.name; }));
	// 	y.domain([1900,3000]);

	// 	//append and call xAxis to display xAxis
	//    	chart.append("g")
	//       .attr("class", "x axis")
	//       .attr("transform", "translate(0," + height + ")")
	//       .call(xAxis);

	//     //append and call yAxis to display yAxis 
	//    	chart.append("g")
	//       .attr("class", "y axis")
	//       .call(yAxis)
	//       .append("text")
	//       .attr("transform","rotate(-90)")
	//       .attr("y",5)
	//       .attr("dy",".71em")
	//       .style("text-anchor","end")
	//       .text("information");

	//     // insert data and bind to virtual elements for bar charts  
	//    	chart.selectAll(".bar")
	//       .data(data)
	//     .enter().append("rect")
	//       .attr("class", "bar")
	//       .attr("x", function(d) { return x(d.data.name); })
	//       .attr("y", function(d) { return y(d.data.score); })
	//       .attr("height", function(d) { return height - y(d.data.score); })
	//       .attr("width", x.rangeBand());
	// 	});

	// **************load data from API call********************
	// d3.json("/api/data/",function(err,data){

	// 	//define domain with data range
	// 	x.domain(data.map(function(d) { return d.AppsName; }));
	// 	// x.domain(function(d) {return d.AppsName ; });
	// 	y.domain([0,d3.max(data,function(d) {return d.LicenseUsed ; })]);

	// 	// console.log(data);
	// 	//append and call xAxis to display xAxis
	// 	chart.append("g")
	// 	.attr("class","x axis")
	// 	.attr("transform", "translate(0," + (height +30)  + ")")
	// 	.call(xAxis);

	// 	//append and call yAxis to display yAxis
	// 	chart.append("g")
	// 	.attr("class","y axis")
	// 	.call(yAxis)
	// 	.append("text")
	// 	.attr("transform","rotate(-90)")
	// 	.attr("y",5)
	// 	.attr("dy",".71em")
	// 	.style("text-anchor","end")
	// 	.text("information");

	// 	// insert data and bind to virtual elements for bar charts  
	// 	chart.selectAll(".bar")
	// 	.data(data)
	// 	.enter().append("rect")
	// 	.attr("class","bar")
	// 	.attr("x",function(d){return x(d.AppsName) ;})
	// 	.attr("y",function(d){return y(d.LicenseUsed) ;})
	// 	.attr("height",function(d){return height - y(d.LicenseUsed) ;})
	// 	.attr("width",5);
	//  });

	return {
		tableDisplay		: $rootScope.tableDisplay,
		scatterPlotDisplay  : $rootScope.scatterPlotDisplay,
		brushDisplay		: $rootScope.brushDisplay
	}

  }]);
