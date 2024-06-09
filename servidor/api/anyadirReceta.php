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
    $query_id_receta = $c1->query("SELECT MAX(CAST(id AS UNSIGNED)) FROM recetas");
    $id_receta_nueva = $query_id_receta->fetch_row()[0] + 1;

    // Añadir a "recetas"
    $stmt = $c1->prepare("INSERT INTO `recetas`(`id`, `nombre`, `fecha`, `etapa`, `imagen`, `autor`) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $id_receta_nueva, $datos->nombre, $datos->fecha, $datos->etapa, $datos->imagen, $datos->autor);
    $stmt->execute();

    // Obtener primera ID ingrediente
    $query_id_ingrediente = $c1->query("SELECT MAX(CAST(id AS UNSIGNED)) FROM ingredientes");
    $id_primer_ingrediente_nuevo = $query_id_ingrediente->fetch_row()[0] + 1;

    // Insertar los distintos ingredientes
    $i = intval($id_primer_ingrediente_nuevo);
    foreach($datos->ingredientes as $conjunto_ingrediente) {
        $stmt = $c1->prepare("INSERT INTO `ingredientes`(`id`, `nombre`, `cantidad`, `unidad`) VALUES (?,?,?,?)");
        $cantidad = intval($conjunto_ingrediente->cantidad);
        $stmt->bind_param("ssis", $i, $conjunto_ingrediente->nombre, $cantidad, $conjunto_ingrediente->unidad);
        $stmt->execute();
        $i++;
    }

    // Obtener ID de la preparación
    $query_id_preparacion = $c1->query("SELECT MAX(CAST(id AS UNSIGNED)) FROM preparacion");
    $id_preparacion_nueva = $query_id_preparacion->fetch_row()[0] + 1;

    // Insertar la preparación
    $stmt = $c1->prepare("INSERT INTO `preparacion`(`id`, `descripcion`) VALUES (?,?)");
    $stmt->bind_param("ss", $id_preparacion_nueva, $datos->preparacion);
    $stmt->execute();

    // Unir ingredientes con receta
    $i = intval($id_primer_ingrediente_nuevo);
    foreach($datos->ingredientes as $conjunto_ingrediente) {
        $stmt = $c1->prepare("INSERT INTO `ri`(`receta`, `ingrediente`, `cantidad`) VALUES (?,?,0)");
        $stmt->bind_param("ss", $id_receta_nueva, $i);
        $stmt->execute();
        $i++;
    }

    // Unir ingredientes con preparación
    $stmt = $c1->prepare("INSERT INTO `rp`(`receta`, `preparacion`, `orden`) VALUES (?,?,0)");
    $stmt->bind_param("ss", $id_receta_nueva, $id_preparacion_nueva);
    $stmt->execute();

    echo json_encode($datos->imagen);

?>