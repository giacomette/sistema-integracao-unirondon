<?php

	/**
	* 
	*/
	class Login extends ApiController
	{
		
		function __construct()
		{
			parent::__construct();
		}

		function logar(){

			$email = $_POST['email'];
			$senha = $_POST['senha'];
			$tipo_pessoa_id = $_POST['tipo_pessoa_id'];
 
			$query = "SELECT u.email, u.id, p.nome, u.ativo, u.pessoa_id FROM usuario as u JOIN pessoa as p on p.id = u.pessoa_id WHERE p.tipo_pessoa_id = $tipo_pessoa_id AND email = '$email' AND senha = '$senha'";

			$data = $this->query($query);
			//$this->exportJSON(['query' => $query]);

			

			if(count($data)) {

				$data  = $data[0];

				if($tipo_pessoa_id == 1) { // Aluno
					$aluno = $this->query("SELECT  c.nome, aluno.id as aluno_id FROM aluno JOIN curso as c on c.id = aluno.curso_id WHERE aluno.pessoa_id = $data[pessoa_id]");
					$data['aluno_id'] = $aluno[0]['aluno_id'];

				} else {
					$professor = "SELECT id FROM professor WHERE pessoa_id = $data[pessoa_id]";
					$data['professor_id'] = $professor[0]['id'];
				}


				if($data['ativo'] != 1)  {
					$response = ['status' => "fail", 'message' => 'Este usuário está desativado no sistema!!!'];
				} else {

					$_SESSION['user'] = $data;
					$response = ['status' => "success", 'data' => $data];
				}
				
			} else {

				$response = ['status' => "fail", 'message' => 'Usuário ou senha inválidos!!!'];
			}

			$this->exportJSON($response);
		}
	}



?>