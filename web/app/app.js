(function (angular) {
	
	// Cria o módulo principal
	var app = angular.module('app', [
		'ngCookies',
		'ui.router',
		'app.services', 
		'app.login',
		'app.portais',
		'app.aluno'
	]);

	app
		.value('baseUrl', 'http://localhost/sistema-integracao-unirondon/');  	

	// Cria os demais módulos
	angular.module('app.services', []);
	angular.module('app.login', []);
	angular.module('app.portais', []);
	angular.module('app.aluno', []);





	app
		.run(function($rootScope, $state, $cookies, baseUrl){

			$rootScope.appName = "Integração de Aluno - Unirondon";
			$rootScope.title = $rootScope.appName;
			$rootScope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;

			verificarUsuarioLogado();

			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){                   
                verificarUsuarioLogado();
            });

			$rootScope.$on('loginSuccess', function(){ 
				$rootScope.user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : null;
				$state.transitionTo('app.portais');
			})

            function verificarUsuarioLogado(){

            	if(!$rootScope.user) {

					setTimeout(function(){ 

						$state.transitionTo('app.login');
					}, 10);

				} else {

					//$state.transitionTo('app.portais');
				}
            }


			$rootScope.logout = function(){
				$cookies.put('user', '');
				$rootScope.user = null;
				setTimeout(verificarUsuarioLogado, 100);
			}

	}); 


}(angular))