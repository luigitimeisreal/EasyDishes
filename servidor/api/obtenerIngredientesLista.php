<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    // Uso de la clase mysqli

    $dbhost="localhost";
    $dbuser="root";
    $dbpass="1234";

    // Creacion de instancia y paso de parametros al constructor
    $c1 = new mysqli($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . $c1->error.'<br>');

    // Usar la base de datos
    $c1->query("USE easydishes");

    $query_id_ingrediente = $c1->query("SELECT ingrediente FROM `il` WHERE lista='" . $_GET["id"] . "';");
    $ingredientes = [];
    while($id_ingrediente = $query_id_ingrediente->fetch_row()) {
        $query_datos_ingredientes = $c1->query("SELECT nombre, cantidad, unidad FROM `ingredientes` WHERE id='" . $id_ingrediente[0] . "';");
        $datos_ingredientes = $query_datos_ingredientes->fetch_array(MYSQLI_ASSOC);
        $ingrediente = [
            "id" => $id_ingrediente[0],
            "nombre" => $datos_ingredientes["nombre"],
            "cantidad" => $datos_ingredientes["cantidad"],
            "unidad" => $datos_ingredientes["unidad"]
        ];
        $ingredientes[] = $ingrediente;
    }

    echo json_encode($ingredientes);


?>