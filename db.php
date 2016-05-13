<?php
  if(isset($_GET['req'])) $method=$_GET['req'];
  else $method=$_POST['req'];
  $db=new World();
  $db->$method($_REQUEST);
  class World{
    public $countryArray=array('Australia','India');
    public $cityArray=array(array("name"=>"Melbourne","cID"=>0),array("name"=>"Sydney","cID"=>0),array("name"=>"Hyderabad","cID"=>1),array("name"=>"Karimnagar","cID"=>1));
	public function __construct(){
	}
	public function getWorld(){
	  echo json_encode(array("countries"=>$this->countryArray,"cities"=>$this->cityArray));	
	}
	public function addToWorld($request){
	  if(!array_search($request['country'],$this->countryArray)) array_push($this->countryArray,$request['country']);
      array_push($this->cityArray,array("name"=>$request['city'],"cid"=>array_search($request['country'],$this->countryArray)));
	  $this->getWorld();
	}
  }
?>