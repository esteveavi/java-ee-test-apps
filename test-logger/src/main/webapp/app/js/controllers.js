'use strict';

/* Controllers */


function MyCtrl1($scope, $timeout, $log) {
	$scope.germanyData = 100;
	$scope.title = 'Lorem Ipsum';
	var timeoutId;
	$scope.chartData = [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],	['', $scope.germanyData, 300, 400, 500, 600, 800]];


	$scope.updateDate = function(){
		$scope.chartData = [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],	['', parseInt($scope.germanyData), 300, 400, 500, 600, 800]];		
	}


	$scope.startPulling =  function() {
		// save the timeoutId for canceling
		timeoutId = $timeout(function() {
			$log.log('Polling');
			$scope.updateDate(); // update DOM
			$scope.startPulling()
		}, 5000);
	}

	$scope.startPulling();
}


function FileUploadCntl($scope, $timeout, $log, $http) {
	$scope.createUser = function() {
		/*
		$http({
		method: 'POST',
		url: '../rest/customer/upload/process',
		data: $scope.uploadedFile,
		headers: {'Content-Type': 'multipart/form-data'}
		});
		*/
		
		  var fileInput = document.getElementById('uploadedFile');
	        var file = fileInput.files[0];
	        var formData = new FormData();
	        formData.append('uploadedFile', file)
	        
		var fd = new FormData();
		fd.append('uploadedFile', $scope.uploadedFile);
		
		$http.post('../rest/customer/upload/process', formData, {
		    transformRequest: angular.identity,
		    headers: {
		        'Content-Type': undefined
		    }
		});
		
		
		
		
	}
	/* http://blog.new-bamboo.co.uk/2012/01/10/ridiculously-simple-ajax-uploads-with-formdata */
	$scope.uploadFile = function() {
        var fd = new FormData()
        
        var fileInput = document.getElementById('uploadedFile');
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('uploadedFile', file);
        
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "../rest/customer/upload/process")
        $scope.progressVisible = true
        xhr.send(formData)
    }

    function uploadProgress(evt) {
    	$scope.$apply(function(){
            if (evt.lengthComputable) {
            	$scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
            	$scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
    	$scope.$apply(function(){
        	$scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
	
	
	
	
	
}



function MyCtrl2($scope, $timeout, $log, MonitoringService) {
	var timeoutId;

	$scope.title = 'Lorem Ipsum';
	$scope.chartData = [];
	$scope.monitoringData = new Object();

	$scope.updateDate = function(){
		var monitoringDataResponse = MonitoringService.get(function(){
				$scope.monitoringData = monitoringDataResponse;
				$scope.$broadcast('MonitoringDataUpdated');
				$log.log("Data Updated");
				
			}
		);
	}

	$scope.startPulling =  function() {
		// save the timeoutId for canceling
		timeoutId = $timeout(function() {
			$log.log('Polling');
			$scope.updateDate(); // update DOM
			$scope.startPulling()
		}, 5000);
	}

	$scope.startPulling();

}


function RequestChartCntl($scope, $log ) {
	$scope.chartData = [];
	$scope.dataPropWebappMetricsFilter = "com.yammer.metrics.web.WebappMetricsFilter";
	$scope.$on('MonitoringDataUpdated', function() {
		$log.log("RequestChartCntl ");
	    var requestsMean = new Number($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.mean);
		requestsMean = requestsMean.toFixed(2);
		$scope.chartData = [
		                    ['Label', 'Value'],
		                    ['Req/'+$scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.rate.unit, Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.rate.m1)],
		                    ['Dur('+$scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.unit+')', requestsMean*1]
		                    ];	
		
	    
	  });
}


function MemoryChartCntl($scope, $log ) {
	$scope.chartData = [];
	$scope.dataPropJVMMemory = "jvm.vm.memory";
	$scope.$on('MonitoringDataUpdated', function() {
		
	    var requestsMean = new Number($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.mean);
		requestsMean = requestsMean.toFixed(2);
		$scope.chartData = [
		                    ['Label', 'Value'],
		                    ['Req/'+$scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.rate.unit, Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.rate.m1)],
		                    ['Dur('+$scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.unit+')', requestsMean*1]
		                    ];	
		
	    
	  });
}


function ThreadCountCntl($scope, $log, $filter ) {
	$scope.chartData = [];
	$scope.dataPropThreadCount = "jvm";
	$scope.dataHeader = ['Label', 'ThreadCount', 'DaemonThreadCount'];
	$scope.chartData = [
	                    $scope.dataHeader,
	                    ['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0', 0, 0],['0',0, 0]
	                    ];
	$scope.$on('MonitoringDataUpdated', function() {
	    var threadCount = $scope.monitoringData[$scope.dataPropThreadCount].thread_count;
	    var daemonThreadCount = $scope.monitoringData[$scope.dataPropThreadCount].daemon_thread_count;
	    var tempData = [];
	    angular.copy($scope.chartData, tempData);
	    $log.log("ThreadCountCntl Updating to "+threadCount);
	    var currentTime = $filter('date')($scope.monitoringData[$scope.dataPropThreadCount].current_time, 'mediumTime');
		tempData.splice(1, 1);
		tempData.push([ currentTime , threadCount, daemonThreadCount]);
		$scope.chartData = tempData;
	    $log.log("Chart Data: "+$scope.chartData);
	  });
}

function MemorytCntl($scope, $log, $filter ) {
	$scope.chartData = [];
	$scope.dataPropJVM = "jvm";
	$scope.dataHeader = ['Label', 'totalInit', 'totalUsed', 'totalMax', 'totalCommitted'];
	$scope.chartData = [
	                    $scope.dataHeader,
	                    ['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0',0, 0, 0, 0]
	                    ];
	$scope.$on('MonitoringDataUpdated', function() {
		var currentTime = $filter('date')($scope.monitoringData[$scope.dataPropJVM].current_time, 'mediumTime');
	    var totalInit = $scope.monitoringData[$scope.dataPropJVM].memory.totalInit;
	    var totalUsed = $scope.monitoringData[$scope.dataPropJVM].memory.totalUsed;
	    var totalMax = $scope.monitoringData[$scope.dataPropJVM].memory.totalMax;
	    var totalCommitted = $scope.monitoringData[$scope.dataPropJVM].memory.totalCommitted;

	    var tempData = [];
	    angular.copy($scope.chartData, tempData);
		tempData.splice(1, 1);
		tempData.push([ currentTime , totalInit, totalUsed, totalMax, totalCommitted]);
		$scope.chartData = tempData;
	    $log.log("Chart Data: "+$scope.chartData);
	  });
}

function MemoryHeaptCntl($scope, $log, $filter ) {
	$scope.chartData = [];
	$scope.dataPropJVM = "jvm";
	$scope.dataHeader = ['Label', 'heapInit', 'heapUsed', 'heapMax', 'heapCommitted'];
	$scope.chartData = [
	                    $scope.dataHeader,
	                    ['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0', 0, 0, 0, 0],['0',0, 0, 0, 0]
	                    ];
	$scope.$on('MonitoringDataUpdated', function() {
		var currentTime = $filter('date')($scope.monitoringData[$scope.dataPropJVM].current_time, 'mediumTime');
	    var totalInit = $scope.monitoringData[$scope.dataPropJVM].memory.heapInit;
	    var totalUsed = $scope.monitoringData[$scope.dataPropJVM].memory.heapUsed;
	    var totalMax = $scope.monitoringData[$scope.dataPropJVM].memory.heapMax;
	    var totalCommitted = $scope.monitoringData[$scope.dataPropJVM].memory.heapCommitted;

	    var tempData = [];
	    angular.copy($scope.chartData, tempData);
		tempData.splice(1, 1);
		tempData.push([ currentTime , totalInit, totalUsed, totalMax, totalCommitted]);
		$scope.chartData = tempData;
	    $log.log("Chart Data: "+$scope.chartData);
	  });
}

google.load('visualization', '1',  {packages: ['gauge', "corechart"]});   // Don't need to specify chart libraries!