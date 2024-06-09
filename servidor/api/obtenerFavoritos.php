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

    $query_recetas = $c1->query("SELECT receta FROM `favoritos` WHERE usuario='" . $_GET['usuario'] . "';");
    $recetas = [];
    while($id_receta = $query_recetas->fetch_row()) {
        $id_receta[0];
        $query_datos_receta = $c1->query("SELECT imagen,nombre FROM `recetas` WHERE id='" . $id_receta[0] . "';");
        $datos_receta = $query_datos_receta->fetch_array(MYSQLI_ASSOC);
        $receta = [
            "id"=>$id_receta[0],
            "imagen"=>$datos_receta["imagen"],
            "nombre"=>$datos_receta["nombre"]
        ];
        $recetas[] = $receta;
    }


    echo json_encode($recetas);

?>