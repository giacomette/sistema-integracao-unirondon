(function(module) {
	

	module
		.controller('app.login.mainCtrl', ['$rootScope', '$scope', 'LoginDataServiceFactory', '$cookies', function($rootScope, vm, LoginDataService, $cookies){

			vm.user = {
				nome: "",
				email: "",
				senha: ""
			};

			vm.tipo = [];

			function iniciar(){

				Modal.loading(true);

				LoginDataService
					.retornarTipoPessoa()
					.success(function(data){
						vm.tipo = data;
						Modal.loading(false);
					})
			}

			iniciar();
			
			vm.login = function(){

				
				Modal.loading(true);

				LoginDataService
					.login(vm.user)
					.success(function(data){

						if(typeof data == "string" ) data = JSON.parse(data);

						if(data.status == "success") {

							$cookies.put('user', JSON.stringify(data.data));

							$rootScope.$broadcast('loginSuccess', true);

						} else {
							Modal.alert(data.message, 'Aviso', 'danger')
						}
						

						Modal.loading(false);
					})
			}

			window.vm = vm;

		}]) 

}(angular.module('app.login')));