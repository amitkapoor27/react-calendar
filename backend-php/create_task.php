<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Content-Length, X-Requested-With");

$servername = 'localhost';
$username   = 'root';
$password   = 'sqladmin';
$dbname     = 'demo';
$conn       = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("connection.falied" . mysqli_error());

}

$pr = json_decode(file_get_contents("php://input"), true);
//print_r($pr);
$date_of_time = $pr['dateoftime'];
$task         = $pr['task'];
if (!empty($task) && !empty($date_of_time)) {
    $sql = "INSERT INTO todolist (date_of_time,task)VALUES('$date_of_time','$task')";
    ///print_r($sql);die();
    $result = mysqli_query($conn, $sql);
    if ($result) {
      $last_id = mysqli_insert_id($conn);
      $sql = "select * from  todolist where id='{$last_id}'";
    //  print_r($sql);die();   
      $result = mysqli_query($conn,$sql);
      $res=array();
      while($f =mysqli_fetch_array($result,MYSQLI_ASSOC)){
        $res[]=$f;
        
      }
      $response = array("status" => 1, "msg" => "data inserted", "data" => $res);
      echo json_encode($response);

    } else {
        //   echo "error".mysqli_error($conn);

        $response = array("status" => "0", "msg" => "Invalid data");
        echo json_encode($response);
    }
}
