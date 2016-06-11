(function(modulo){

	'use strict';

	modulo.factory("RequestDataServiceFactory", RequestDataServiceFactory);

	RequestDataServiceFactory.$inject = ["$http"];
	
	function RequestDataServiceFactory($http) {
 
		function RequestDataService() {};

		RequestDataService.prototype.get = function (params) {	

			return $http({
				url : params.url,
				data: params.data,
			});
		};

		RequestDataService.prototype.post = function (params) {

			return $http({
				url : params.url,
				data: params.data,
				method: "POST",
    			headers: {
    				'Content-Type': 'application/x-www-form-urlencoded'
    			},
    			transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    }
			});
		};
	
	    return new RequestDataService();
	};

})(angular.module("app.services"));
