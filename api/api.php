<?php
session_start();

include_once('../config.php');
 /**
 * 
 */
 class ApiController extends PDO
 {
 	protected $db;
 	
 	function __construct()	{ 

 		$this->conn();
 	}

 	function conn(){

 		try {
		    $this->db = new PDO('mysql:host='.SERVER.';dbname='.DATABASE, USERNAME, PASSWORD);
		    
		} catch (PDOException $e) {
		    print "Error!: " . $e->getMessage() . "<br/>";
		    die();
		}
 	}

 	public function exportJSON($data) {
		ob_clean();
 		die (json_encode($data));
	}

	public function query($query) {

		$query = $this->db->prepare($query);
		
		$query->execute();

		return $query->fetchAll(PDO::FETCH_ASSOC);
	} 
 }


?>