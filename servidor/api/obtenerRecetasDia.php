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

    $query_recetas = $c1->query("SELECT `id`, `nombre`,`imagen` FROM `recetas` ORDER BY RAND() LIMIT 6;");
    $recetas = [];
    while($receta = $query_recetas->fetch_array()) {
        $recetaObjeto = [
            "id"=>$receta["id"],
            "imagen"=>$receta["imagen"],
            "nombre"=>$receta["nombre"]
        ];

        $recetas[] = $recetaObjeto;

    }

    echo json_encode($recetas);

?>