<?
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

    // Obtención de datos de petición
    $datos = json_decode(file_get_contents("php://input"));

    $c1->query("DELETE FROM `favoritos` WHERE usuario='" . $datos->usuario . "' AND receta='" . $datos->receta . "';");

    echo json_encode($datos);
    
?>