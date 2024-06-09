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

    $datos_basicos = $c1->query("SELECT * FROM recetas WHERE recetas.ID=" . $_GET["id"]);
    // echo $c1->error;

    $existe = $datos_basicos->num_rows;
    $resultados_receta = $datos_basicos->fetch_array(MYSQLI_ASSOC);
    // print_r($resultados_receta);

    // Si la ID no existe, devolver null
    if($existe == 0) {
        echo json_encode(null);
    } else {
        $imagen = $resultados_receta["imagen"];
        $nombre = $resultados_receta["nombre"];
        $fecha = $resultados_receta["fecha"];
        $etapa = $resultados_receta["etapa"];
        $id = $resultados_receta["id"];
        $autor = "Borrar";
        
        $query_autor = $c1->query("SELECT nombre FROM usuarios WHERE dni='" . $resultados_receta["autor"] . "'");
        $autor = $query_autor->fetch_row();

        // SELECT tipo, nombre FROM ingredientes, R-I WHERE ingredientes.ID=R-I.IDIngredientes AND R-I.IDRecetas=ID
        // SELECT i.id, nombre, i.cantidad, unidad FROM ingredientes i JOIN ri ON ri.ingrediente=i.id WHERE receta=1;
        $query_ingredientes = $c1->query("SELECT i.id, nombre, i.cantidad, unidad FROM ingredientes i JOIN ri ON ri.ingrediente=i.id WHERE receta=" . $id);
        $ingredientes = [];
        while($fila = $query_ingredientes->fetch_array(MYSQLI_ASSOC)) {
            $ingredientes[] = $fila;
        }
        // $ingredientes = ["Filetes de secreto de cerdo", "Aceite de Oliva", "Sal", "Cerveza", "Miel", "Mostaza", "Zumo de limón", "Tahini", "Pimienta"];

        // SELECT descripcion FROM preparacion, R-P WHERE preparacion.ID=R-P.IDPreparacion AND R-P.IDRecetas=ID
        // $preparacion = "Comenzamos elaborando la salsa. Cocemos la cerveza en una cazuela. Cuando alcance el punto de ebullición, agregamos la miel, el tahini, el zumo de limón, la mostaza, una pizca de pimienta y otra de sal; removemos y cocinamos a fuego lento durante cuarenta minutos, hasta que adquiera una textura fina y correctamente ligada. A continuación, freímos las piezas de secreto en una sartén con una pizca de aceite de oliva muy caliente. Cuando estén listas, las extendemos sobre una bandeja y las regamos con la salsa.";
        $query_preparacion = $c1->query("SELECT p.descripcion FROM preparacion p JOIN rp ON rp.preparacion=p.id WHERE rp.receta=" . $id);
        $preparacion = $query_preparacion->fetch_row();
        $receta = [
            "id"=> $_GET["id"],
            "nombre"=> $nombre,
            "imagen"=> $imagen,
            "ingredientes"=> $ingredientes,
            "preparacion"=> $preparacion,
            "fecha"=> $fecha,
            "etapa"=> $etapa,
            "autor"=> $autor
        ];
        echo json_encode($receta);
    }




?>