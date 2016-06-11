(function(module){

	module
		.factory('AlunoDataServiceFactory', ['$http', 'RequestDataServiceFactory', 'baseUrl', function($http, Request, baseUrl){



			return {
				retornarNotas: function(){

					return Request.get({
						url: baseUrl + "api/aluno/notas",
					})
				},

				retornarGradeCurricular: function(){

					return Request.get({
						url: baseUrl + "api/aluno/disciplinas"
					})
				}
			}

			
		}]);

}(angular.module('app.services')))