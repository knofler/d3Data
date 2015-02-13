'use strict';

angular.module('serveMeApp')
  .controller('C3Ctrl', function ($scope,$http,socket) {
    
	// Generate basic chart with static data by c3
	$scope.bChart = c3.generate({
	  bindto: '#bChart',
	  data: {
	  	columns: [
	       ['data1', 30, 200, 100, 400, 150, 250],
	       ['data2', 50, 20, 10, 40, 15, 25]
	  	]
	   }
	 });

	// Introduce additional axis for data2. Add data.axes and axis.y2.show as follows:
	$scope.cChart = c3.generate({
		bindto:'#cChart',
		data:{
			columns: [
				['data1',30, 200, 100, 400, 150, 250],
				['data2',50, 20, 10, 40, 15, 25]
			],
			axes:{
				data2:'y2' //Add
			},
			types:{
				data2:'bar' //Add
			}
		},
		axis:{
			y:{
				label:{ //Add
					text:'Y label',
					position:'outer-middle'
				},
				tick:{
					format:d3.format("$,") //ADD
				}
			},
			y2:{
				show:true,
				label:{ //Add
					text:'Y2 label',
					position:'outer-middle'
				}
				
			}
		}
	 });

	// By using load() API, you can load data and update the chart dynamically as follows:
	// *****************Generate chart without data********************
	$scope.apiChart = c3.generate({
		bindto:'#apiChart',
		data:{
			columns: [
				['data1',30, 200, 100, 400, 150, 250],
				['data2',50, 20, 10, 40, 15, 25]
			],
			axes:{
				data2:'y2' //Add
			},
			types:{
				data2:'bar' //Add
			}
		},
		axis:{
			y:{
				label:{ //Add
					text:'Y label',
					position:'outer-middle'
				},
				tick:{
					format:d3.format("$,") //ADD
				}
			},
			y2:{
				show:true,
				label:{ //Add
					text:'Y2 label',
					position:'outer-middle'
				}
				
			}
		}
	 });

	// ************Load Data **************************
	$scope.loadData = function(){
	  $scope.apiChart.load({
		columns:[
		  ['data1',300, 100, 250, 150, 300, 150, 500],
		  ['data2', 100, 200, 150, 50, 100, 250]
		 ],
		 types:{
				data2:'line' //Add
			}
	    })
	 };
	


  });
