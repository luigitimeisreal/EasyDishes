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

    // Obtener
    $query_listas = $c1->query("SELECT id, fecha FROM `listascompra` WHERE usuario='" . $_GET["usuario"] . "';");
    $resultados = [];
    while($lista = $query_listas->fetch_array()) {
        $resultado = [
            "id"=>$lista["id"],
            "fecha"=>$lista["fecha"]
        ];
        $resultados[] = $resultado;
    }


    echo json_encode($resultados);


?>