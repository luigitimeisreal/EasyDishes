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

    // Obtener hash de contraseña basado en usuario
    $query_contrasenya = $c1->query("SELECT contrasenya FROM usuarios WHERE dni='" . $_GET["dni"] . "'");
    $contrasenya = $query_contrasenya->fetch_row()[0];

    // Verificar contraseña
    if (password_verify($_GET["cont"], $contrasenya)) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
    
?>