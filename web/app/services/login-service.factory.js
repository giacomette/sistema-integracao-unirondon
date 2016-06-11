(function(module){

	module
		.factory('LoginDataServiceFactory', ['RequestDataServiceFactory', 'baseUrl', function(Request, baseUrl){

			return {

				retornarTipoPessoa: function(){

					return Request.get({
						url: baseUrl + "api/tipo-pessoa"
					});
				},

				login: function($user){

					return Request.post({
						url: baseUrl + "api/login/logar",
						data: $user
					});
				}
			}
			
		}]);

}(angular.module('app.services')))