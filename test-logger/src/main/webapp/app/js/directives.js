'use strict';

/* Directives */


angular.module('teamGolSocialNetworkmMonitoring.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}])

.directive('columnChart', function() {

	return function(scope, element, attrs) {

		var chart = new google.visualization.ColumnChart(element[0]);
		scope.$watch(attrs.columnChart, function(value) {
			var data = google.visualization.arrayToDataTable(value);
			var options = {
					title: attrs.chartTitle,
					hAxis: {title: attrs.chartHaxisTitle, titleTextStyle: {color: 'red'}}
			}
			chart.draw(data, options);
		});


	}
})

.directive('gaugeChart', function() {

	return function(scope, element, attrs, MonitoringService) {
		// Log element
		console.log(scope, element, attrs);
		var chart = new google.visualization.Gauge( element[0]);
		scope.$watch(attrs.gaugeChart, function(value) {
			var data = google.visualization.arrayToDataTable(value);

			var options = {
					width: attrs.chartWidth, height: attrs.chartHeight,
					redFrom: attrs.chartRedfrom, redTo: attrs.chartRedto,
					yellowFrom: attrs.chartYellowfrom, yellowTo: attrs.chartYellowto,
					max: attrs.chartMax,
					min: attrs.chartMin,
					minorTicks: 1,
					animation:{
						duration: 1000,
						easing: 'in',
					}
			};
			chart.draw(data, options);

		});
	}
})

.directive('areaChart', function() {

	return function(scope, element, attrs, MonitoringService) {
		// Log element
		console.log(scope, element, attrs);
		var chart = new google.visualization.AreaChart( element[0]);
		scope.$watch(attrs.areaChart, function(value) {
			//alert('New Array: '+value);
			var data = google.visualization.arrayToDataTable(value);

			var options = {
					title: attrs.chartTitle,
					hAxis: {
						title: attrs.chartHaxisTitle,  
						titleTextStyle: {
							color: 'red'
						}
					},
					height: attrs.chartHeight,
					animation:{
						duration: 1000,
						easing: 'in',
					}

			};

			chart.draw(data, options);


		});
	}
})


.directive('formulateUploader', function(){
    return {
        restrict:'E',
    	require:'ngModel',
        scope:{ ngModel: '=' },
        transclude:true,
        link: function(scope, element, attrs, ctrl) {

        
	    	setTimeout(function(){
	    		element.find('.qq-upload-button').addClass('btn');
	    	},0);
	    	
	        var fileList = {};
	        scope.uploader = new qq.FileUploader({
	        	element: element[0],
	        	forceMultipart: true,
	        	 multiple: true,
	            action: '../rest/customer/upload/process',
	            debug: true,
	            onSubmit: function(id, fileName){},
	            onProgress: function(id, fileName, loaded, total){},
	            onCancel: function(id, fileName){},
	            onComplete: function(id, fileName, response){
	            	alert('Uploaded');
	                                  	
	            	scope.$apply();
	                  
		
	            }
	        });
        }
    };
})


.directive('fineUploader', function(){
	 return {
	        restrict:'E',
	    	require:'ngModel',
	        scope:{ ngModel: '=' },
	        transclude:true,
	        link: function(scope, element, attrs, ctrl) {

	        	var uploader = new qq.FineUploader({
	                element: document.getElementById('bootstrapped-fine-uploader'),
	                request: {
	                  endpoint: '../rest/customer/upload/process'
	                },
	                text: {
	                  uploadButton: '<i class="icon-upload icon-white"></i> Test me now and upload a file'
	                },
	                template: '<div class="qq-uploader span12">' +
	                            '<pre class="qq-upload-drop-area span12"><span>{dragZoneText}</span></pre>' +
	                            '<div class="qq-upload-button btn btn-success" style="width: auto;">{uploadButtonText}</div>' +
	                            '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
	                            '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
	                          '</div>',
	                classes: {
	                  success: 'alert alert-success',
	                  fail: 'alert alert-error'
	                },
	                debug: true
		    	
	        	});


	        }
	    };
})




;
