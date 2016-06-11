<?php

	/**
	* 
	*/
	class Aluno extends ApiController
	{
		
		function __construct()
		{
			parent::__construct();
		}

		function notas(){


		}

		function disciplinas(){

			$pessoa_id = 1;

			$aluno = $this->query("SELECT p.nome, d.nome AS disciplina, ad.carga_horaria, ad.nota_final from pessoa AS p JOIN aluno AS a ON a.pessoa_id = p.id JOIN aluno_disciplina AS ad ON ad.aluno_id = a.id JOIN disciplina AS d ON d.id = ad.disciplina_id WHERE p.id = $pessoa_id");

			// $aluno = $this->query("SELECT  c.nome, aluno.id as aluno_id FROM aluno JOIN curso as c on c.id = aluno.curso_id WHERE aluno.pessoa_id = $data[pessoa_id]");
 
			$this->exportJSON($aluno);
		}
	}



?>