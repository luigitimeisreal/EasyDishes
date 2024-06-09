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

    // Obtener ID receta
    $query_id_mensaje = $c1->query("SELECT MAX(CAST(id AS UNSIGNED)) FROM mensajes");
    $id_mensaje_nuevo = $query_id_mensaje->fetch_row()[0] + 1;

    // Obtener fecha
    $fecha = date('Y-m-d H:i:s');

    // Subir mensaje
    $stmt = $c1->prepare("INSERT INTO `mensajes`(`id`, `texto`, `fecha`, `receta`, `usuario`) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssss", $id_mensaje_nuevo, $datos->mensaje, $fecha, $datos->recetaDirigida, $datos->usuario);
    $stmt->execute();

    echo json_encode($id_mensaje_nuevo);

?>