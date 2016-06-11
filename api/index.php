<?php
include_once('api.php');

//$api = new ApiController();

$parts = explode('/', $_SERVER["PATH_INFO"]);

array_shift($parts); 




if(count($parts) > 0 ){

	$controller = $parts[0];

	if(count($parts) > 1 ){

		$action = $parts[1];

	} else {

		$action = "index";
	}

	

	if(file_exists(dirname(__FILE__) . '\\'. $controller.".php")) {

		include_once($controller.".php");

		$split = explode('-', $controller);
		$controller = "";

		foreach($split as $val){
			$controller .= ucfirst($val);
		}

		$instance = new $controller;
		$instance->{$action}();
	}


}
?>