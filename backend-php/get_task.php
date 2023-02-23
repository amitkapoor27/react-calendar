<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With");


$servername ='localhost';
$username = 'root';
$password = 'sqladmin';
$dbname = 'demo';
$conn = mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
    die("connection.falied".mysqli_error());

}

$pr =json_decode(file_get_contents("php://input"),true);

//$id=$pr['id'];
$a=explode("-",$pr["date"]);
$b=str_pad($a[2], 2, '0', STR_PAD_LEFT);
$d=$a[0]."-".$a[1]."-".$b;
//$date=date("Y-m-d",strtotime($pr["date"]));

      $sql = "select * from  todolist where date(date_of_time)='{$d}'";
    //  print_r($sql);die();   
      $result = mysqli_query($conn,$sql);
      $res=array();
      while($f =mysqli_fetch_array($result,MYSQLI_ASSOC)){
        $res[]=$f;
        
      }
      $response = array("status"=>1,"msg"=>"datashow","data"=>$res );
      if($result){
          echo json_encode($response);
         
      
      } else{
        //   echo "error".mysqli_error($conn);
          
        $response=array("status"=>"0", "msg"=>"Invalid data");
        echo json_encode($response);
      }
 
?>