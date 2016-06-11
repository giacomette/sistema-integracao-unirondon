(function(module) {
	

	module


		.controller('app.aluno.mainCtrl', ['$scope', 'AlunoDataServiceFactory', function(vm, AlunoService){

			console.log('ola mundo!!!');


		}])


		.controller('app.aluno.gradeCurricularCtrl', ['$scope', 'AlunoDataServiceFactory', function(vm, AlunoService){

			vm.gradeCurricular = [];

			function iniciar(){

				Modal.loading(true);

				AlunoService
					.retornarGradeCurricular()
					.success(function(data){
						vm.gradeCurricular = data;
						Modal.loading(false);
					})
			}

			iniciar();



		}]) 


		.controller('app.aluno.notasCtrl', ['$scope', 'AlunoDataServiceFactory', function(vm, AlunoService){

			vm.notas = [];

			function iniciar(){

				Modal.loading(true);

				AlunoService
					.retornarNotas()
					.success(function(data){
						vm.notas = data;
						Modal.loading(false);
					})
			}

			iniciar();


		}]) 


		.controller('app.aluno.horarioAulaCtrl', ['$scope', 'AlunoDataServiceFactory', function(vm, AlunoService){

			console.log('horarioAulaCtrl');


		}]) 


		.controller('app.aluno.calendarioCtrl', ['$scope', 'AlunoDataServiceFactory', function(vm, AlunoService){

			console.log('horarioAulaCtrl');


		}]) 

}(angular.module('app.aluno')));