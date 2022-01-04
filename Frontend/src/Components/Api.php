<?php

header('Access-Control-Allow-Origin: *');
header('Access-control-Allow-Methods: GET,POST');
header("Access-Control-Allow-Headers: X-Requested-with");

$conn = mysqli_connect('localhost','root','','aaa');

$sql ="SELECT * from none";
$json_data =array();

while($row = mysqli_fetch_assoc($mysqli)){
 $json_data[]=$row;
}

echo json_encode(['result'=>$json_data])


?>
