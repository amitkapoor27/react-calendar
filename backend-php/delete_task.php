<?php

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access_Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access_Control-Allow-Methods,Access-Control-Allow-Origin,Content-Type');
$servername = 'localhost';
$username   = 'root';
$password   = 'sqladmin';
$dbname     = 'demo';
$conn       = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("connection.falied" . mysqli_error());

}
$a = json_decode(file_get_contents("php://input"), true);

$id = $a['id'];
//$id = (isset($a['ID']))?$a['ID']:"";
if (!empty($id)) {
    $sql    = "DELETE FROM todolist WHERE ID='$id'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $response = array("staus" => 1, "msg" => "Data Deleted successfully");
        echo json_encode($response);
    } else {
        $response = array("staus" => 0, "msg" => "Unable To Deleted Data", "error" => $conn->error);
        echo json_encode($response);
    }
}
