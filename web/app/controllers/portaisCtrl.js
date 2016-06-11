(function(module) {
	

	module
		.controller('app.portais.mainCtrl', ['$scope', function(vm){

			
			vm.menus = [
				{
					nome: "Minhas Notas",
					link: "app.aluno.notas",
					classe: "fa fa-edit"
				},
				{
					nome: "Grade Curricular",
					link: "app.aluno.gradeCurricular",
					classe: "fa fa-university"
				},
				{
					nome: "Horário de Aula",
					link: "app.aluno.horarioAula",
					classe: "fa fa-calendar-check-o"
				},
				{
					nome: "Avisos e Calendário",
					link: "app.aluno.calendario",
					classe: "fa fa-calendar"
				}
			];

		}]) 

}(angular.module('app.portais')));