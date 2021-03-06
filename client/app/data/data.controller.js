'use strict';

angular.module('serveMeApp')
  .controller('DataCtrl',['$scope','dataSrv', function ($scope,dataSrv) {

  	$scope.prepare_Redditdata = function (payload){
		var data = payload.data.children;
		  data.forEach(function(d){
			  d.data.created *=1000;
		     });
		return data;
	 };
	$scope.addredditColumn    = function (rowsEnter){
  		rowsEnter.append("td")
			 .text(function(d){return d.data.score });
			// Column-2
			rowsEnter.append("td") 
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .append("img")
			 .attr({
			   src: function(d){return d.data.thumbnail }
			  });
			// Column-3
			rowsEnter.append("td")
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .text(function(d){return d.data.title });
			// Column-4
			rowsEnter.append("td")
			 .text(function(d){return d.data.ups });
			// Column-5
			rowsEnter.append("td")
			.text(function(d){return d.data.downs });	
  	 };
  	 
	$scope.prepare_thingsdata = function (payload){
		var data = payload
		return data;
	 };
    $scope.addThingsColumn    = function (rowsEnter){
    	rowsEnter.append("td")
			 .text(function(d){return d.name });
			// Column-2
			rowsEnter.append("td")
			.text(function(d){return d.info });	
     };

    $scope.prepare_scatterdata = function (payload){
		var data = payload.data.children;
		data.forEach(function(d){
			d.data.created *= 1000;
		})
		// console.log(data);

		return data;
	 }; 


    //call table service 
    setTimeout(function(){
       dataSrv.tableDisplay("assets/dataDir/data.json","JSON",".col-md-12",$scope.prepare_Redditdata,$scope.addredditColumn);
    },4200);
   
    // dataSrv.tableDisplay("/api/things/","JSON",".col-md-12",$scope.prepare_thingsdata,$scope.addThingsColumn);  

    //call scatterplot service
    setTimeout(function(){
 	  dataSrv.scatterPlotDisplay("assets/dataDir/data.json","JSON","#svg3",$scope.prepare_scatterdata); 
    },4200);
   
    //call Brush service
    setTimeout(function(){
       dataSrv.brushDisplay("assets/dataDir/data.json","JSON","#svg4",$scope.prepare_scatterdata); 
    },4200);
 	
  	
  }]);
