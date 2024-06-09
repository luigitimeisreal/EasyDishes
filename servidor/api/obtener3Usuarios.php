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

    // SELECT DISTINCT autor FROM recetas LIMIT 3;
    // Uso de la clase mysqli

    $dbhost="localhost";
    $dbuser="root";
    $dbpass="1234";

    // Creacion de instancia y paso de parametros al constructor
    $c1 = new mysqli($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . $c1->error.'<br>');

    // Usar la base de datos
	$c1->query("USE easydishes");

    // Obtener usuarios
    $query_usuarios = $c1->query("SELECT DISTINCT autor FROM recetas ORDER BY RAND() LIMIT 3");
    $usuarios = [];
    while($usuario_dni = $query_usuarios->fetch_row()) {
        $usuario["dni"] = $usuario_dni[0];
        $query_nombre = $c1->query("SELECT nombre FROM usuarios WHERE dni='" . $usuario_dni[0] . "';");
        $usuario["nombre"] = $query_nombre->fetch_row()[0];
        $usuarios[] = $usuario;
    }


    echo json_encode($usuarios);


?>