<?php

	/**
	* 
	*/
	class TipoPessoa extends ApiController
	{
		
		function __construct()
		{
			parent::__construct();
		}

		function index(){

			$data = $this->query("SELECT * FROM tipo_pessoa");
			

			$this->exportJSON($data);
		}
	}



?>