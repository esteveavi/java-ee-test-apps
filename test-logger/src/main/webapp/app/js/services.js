'use strict';

/* Services */


//Demonstrate how to register services
//In this case it is a simple value service.
angular.module('teamGolSocialNetworkmMonitoring.services', ['ngResource']).
value('version', '0.1')
.factory('MonitoringService', function($resource){
	return $resource('../metrics/metrics', {}, {
		query: {method:'GET', isArray:false}
	});
});