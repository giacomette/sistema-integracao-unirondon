(function(module){


	module.config(function($urlRouterProvider, $stateProvider){


		var pathView = "./web/app/views/";
	


		$stateProvider

			.state('app', {
			    url: '/portais',
			    abstract: true,
			    templateUrl: pathView + "layout/main.view.html",
			   	controller: ["$state", function ($state){
                    //$state.transitionTo("app.portais");
                }]
			})

			.state('app.portais', {
			    url: '/',
			    views: {
			      'content': {
			        templateUrl: pathView + "portais/main.view.html",
			        controller: 'app.portais.mainCtrl'
			      }
			    }
            })

			.state('app.aluno', {

			    url: '/aluno',
                abstract: true, 
                views:  {
                    "content": {
                        template: "<div ui-view />"
                    }
                }	     
            })

			.state('app.aluno.gradeCurricular', {
			    url: '/grade-curricular',			    
		        templateUrl: pathView + "aluno/grade-curricular.view.html",
		        controller: 'app.aluno.gradeCurricularCtrl' 
            })

			.state('app.aluno.notas', {
			    url: '/notas', 
		        templateUrl: pathView + "aluno/notas.view.html",
		        controller: 'app.aluno.notasCtrl'			      
            })

			.state('app.aluno.horarioAula', {
			    url: '/horario-aula', 
		        templateUrl: pathView + "aluno/horario-aula.view.html",
		        controller: 'app.aluno.horarioAulaCtrl'			       
            })

			.state('app.aluno.calendario', {
			    url: '/calendario',
		        templateUrl: pathView + "aluno/calendario.view.html",
		        controller: 'app.aluno.calendarioCtrl'
            })

			.state('app.login', {

			    url: '/login',
			    views: {
			      'content': {
			        templateUrl: pathView + "login/main.view.html",
			        controller: 'app.login.mainCtrl'
			      }
			    }
            })

		//$urlRouterProvider.otherwise("/portais");  

	});


}(angular.module('app')))