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

    $datos = json_decode(file_get_contents("php://input"));

    $query_id_lista = $c1->query("SELECT MAX(CAST(id AS UNSIGNED)) FROM listascompra");
    $id_lista_nueva = $query_id_lista->fetch_row()[0] + 1;

    $stmt = $c1->prepare("INSERT INTO `listascompra`(`id`, `fecha`, `usuario`) VALUES (?,?,?)");
    $stmt->bind_param("sss", $id_lista_nueva, $datos->fecha, $datos->usuario);
    $stmt->execute();

    echo json_encode($id_lista_nueva);

?>