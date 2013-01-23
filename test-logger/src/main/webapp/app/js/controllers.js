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

		var fileInput = document.getElementById('uploadedFile');
		var file = fileInput.files[0];
		var formData = new FormData();
		formData.append('uploadedFile', file);

		var fd = new FormData();
		fd.append('uploadedFile', $scope.uploadedFile);

		$http.post('../rest/customer/upload/process', formData, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		});

	}

}



function MyCtrl2($scope, $timeout, $log, MonitoringService, loadingService) {
	var timeoutId;

	$scope.$watch(function() { 
		//alert('Count '+loadingService.requestCount);
		return loadingService.isLoading(); 
		
		}
	, 
		function(value) { 
			$scope.loading = value; });
	
	
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


function RequestCntl($scope, $log ) {
	$scope.chartData = [];
	$scope.dataPropWebappMetricsFilter = "com.yammer.metrics.web.WebappMetricsFilter";
	$scope.$on('MonitoringDataUpdated', function() {
		$log.log("RequestChartCntl ");
		$scope.requestsMean = $scope.monitoringData[$scope.dataPropWebappMetricsFilter];
		
		/* Request duration */
		$scope.requestDurationUnit =  $scope.$eval('requestsMean.requests.duration.unit');
		$scope.requestDurationMin =  $scope.$eval('requestsMean.requests.duration.min').toPrecision(3);
		$scope.requestDurationMax =  $scope.$eval('requestsMean.requests.duration.max').toPrecision(5);
		$scope.requestDurationMean =   $scope.$eval('requestsMean.requests.duration.mean').toPrecision(3);
		$scope.requestDurationStd =  $scope.$eval('requestsMean.requests.duration.std_dev').toPrecision(3);
		$scope.requestDurationMedian =  $scope.$eval('requestsMean.requests.duration.median').toPrecision(3);
		$scope.requestDurationp75 =  $scope.$eval('requestsMean.requests.duration.p75').toPrecision(3);
		$scope.requestDurationp95 =  $scope.$eval('requestsMean.requests.duration.p95').toPrecision(3);
		$scope.requestDurationp98 =  $scope.$eval('requestsMean.requests.duration.p98').toPrecision(3);
		$scope.requestDurationp99 =  $scope.$eval('requestsMean.requests.duration.p99').toPrecision(3);
		$scope.requestDurationp999 =  $scope.$eval('requestsMean.requests.duration.p999').toPrecision(3);

		/* Request Rate */
		$scope.requestRateUnit =  $scope.$eval('requestsMean.requests.rate.unit');
		$scope.requestRateCount =  $scope.$eval('requestsMean.requests.rate.count');
		$scope.requestRateMean =  $scope.$eval('requestsMean.requests.rate.mean').toPrecision(5);
		$scope.requestRateM1 =   $scope.$eval('requestsMean.requests.rate.m1').toPrecision(3);
		$scope.requestRateM5 =  $scope.$eval('requestsMean.requests.rate.m5').toPrecision(3);
		$scope.requestRateM15 =  $scope.$eval('requestsMean.requests.rate.m15').toPrecision(3);
		
		/* Bad Requests */
		$scope.badRequest = $scope.requestsMean["responseCodes.badRequest"];
		$scope.badRequestUnit =  $scope.$eval('badRequest.unit');
		$scope.badRequestCount =  $scope.$eval('badRequest.count');
		$scope.badRequestMean =  $scope.$eval('badRequest.mean').toPrecision(5);
		$scope.badRequestM1 =  $scope.$eval('badRequest.m1').toPrecision(5);
		$scope.badRequestM5 =  $scope.$eval('badRequest.m5').toPrecision(5);
		$scope.badRequestM15 =  $scope.$eval('badRequest.m15').toPrecision(5);
		
		
		/* Created */
		$scope.requestCreated = $scope.requestsMean["responseCodes.created"];
		$scope.requestCreatedUnit =  $scope.$eval('requestCreated.unit');
		$scope.requestCreatedCount =  $scope.$eval('requestCreated.count');
		$scope.requestCreatedMean =  $scope.$eval('requestCreated.mean').toPrecision(5);
		$scope.requestCreatedM1 =  $scope.$eval('requestCreated.m1').toPrecision(5);
		$scope.requestCreatedM5 =  $scope.$eval('requestCreated.m5').toPrecision(5);
		$scope.requestCreatedM15 =  $scope.$eval('requestCreated.m15').toPrecision(5);
		
		/* noContent */
		$scope.requestNoContent = $scope.requestsMean["responseCodes.noContent"];
		$scope.requestNoContentUnit =  $scope.$eval('requestNoContent.unit');
		$scope.requestNoContentCount =  $scope.$eval('requestNoContent.count');
		$scope.requestNoContentMean =  $scope.$eval('requestNoContent.mean').toPrecision(5);
		$scope.requestNoContentM1 =  $scope.$eval('requestNoContent.m1').toPrecision(5);
		$scope.requestNoContentM5 =  $scope.$eval('requestNoContent.m5').toPrecision(5);
		$scope.requestNoContentM15 =  $scope.$eval('requestNoContent.m15').toPrecision(5);
		
		/* requestNotFound */
		$scope.requestNotFound = $scope.requestsMean["responseCodes.notFound"];
		$scope.requestNotFoundUnit =  $scope.$eval('requestNotFound.unit');
		$scope.requestNotFoundCount =  $scope.$eval('requestNotFound.count');
		$scope.requestNotFoundMean =  $scope.$eval('requestNotFound.mean').toPrecision(5);
		$scope.requestNotFoundM1 =  $scope.$eval('requestNotFound.m1').toPrecision(5);
		$scope.requestNotFoundM5 =  $scope.$eval('requestNotFound.m5').toPrecision(5);
		$scope.requestNotFoundM15 =  $scope.$eval('requestNotFound.m15').toPrecision(5);
		
		
		/* Ok */
		$scope.requestOk = $scope.requestsMean["responseCodes.ok"];
		$scope.requestOkUnit =  $scope.$eval('requestOk.unit');
		$scope.requestOkCount =  $scope.$eval('requestOk.count');
		$scope.requestOkMean =  $scope.$eval('requestOk.mean').toPrecision(5);
		$scope.requestOkM1 =  $scope.$eval('requestOk.m1').toPrecision(5);
		$scope.requestOkM5 =  $scope.$eval('requestOk.m5').toPrecision(5);
		$scope.requestOkM15 =  $scope.$eval('requestOk.m15').toPrecision(5);	
		
		/* Other */
		$scope.requestOther = $scope.requestsMean["responseCodes.other"];
		$scope.requestOtherUnit =  $scope.$eval('requestOther.unit');
		$scope.requestOtherCount =  $scope.$eval('requestOther.count');
		$scope.requestOtherMean =  $scope.$eval('requestOther.mean').toPrecision(5);
		$scope.requestOtherM1 =  $scope.$eval('requestOther.m1').toPrecision(5);
		$scope.requestOtherM5 =  $scope.$eval('requestOther.m5').toPrecision(5);
		$scope.requestOtherM15 =  $scope.$eval('requestOther.m15').toPrecision(5);

		
		/* Server Error */
		$scope.requestServerError = $scope.requestsMean["responseCodes.serverError"];
		$scope.requestServerErrorUnit =  $scope.$eval('requestServerError.unit');
		$scope.requestServerErrorCount =  $scope.$eval('requestServerError.count');
		$scope.requestServerErrorMean =  $scope.$eval('requestServerError.mean').toPrecision(5);
		$scope.requestServerErrorM1 =  $scope.$eval('requestServerError.m1').toPrecision(5);
		$scope.requestServerErrorM5 =  $scope.$eval('requestServerError.m5').toPrecision(5);
		$scope.requestServerErrorM15 =  $scope.$eval('requestServerError.m15').toPrecision(5);	
		
	});
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


function ActiveRequestChartCntl($scope, $log ) {
	$scope.chartData = [];
	$scope.dataPropWebappMetricsFilter = "com.yammer.metrics.web.WebappMetricsFilter";
	$scope.$on('MonitoringDataUpdated', function() {
		var requestsMean = new Number($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.mean);
		requestsMean = requestsMean.toFixed(2);
		$scope.chartData = [
		                    ['Label', 'Value'],
		                    ['Active Req', Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].activeRequests.count)],
		                    ];	
	});
}


function RequestsCandleStickChartCntl($scope, $log, $filter ) {
	$scope.dataPropWebappMetricsFilter = "com.yammer.metrics.web.WebappMetricsFilter";
	
	$scope.chartData = [
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0', 0, 0, 0, 0],
	                    ['0',0, 0, 0, 0]
	                    ];
	
	$scope.$on('MonitoringDataUpdated', function() {
		$scope.unit = $scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.unit;
		var requestDurationMin = Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.min);
		var requestDurationMax = Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.max);
		var requestDurationMean = Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.mean);
		var requestDurationStdDev = Math.round($scope.monitoringData[$scope.dataPropWebappMetricsFilter].requests.duration.std_dev);
		var tempData = [];
		angular.copy($scope.chartData, tempData);
		var now = new Date();
		var currentTime = $filter('date') (now, 'mediumTime') ;
		tempData.splice(0, 1);
		tempData.push([ currentTime , requestDurationMin, requestDurationMean-requestDurationStdDev,requestDurationMean+requestDurationStdDev, requestDurationMax]);
		$scope.chartData = tempData;
		$log.log("Chart Data: "+$scope.chartData);
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