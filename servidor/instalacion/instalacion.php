<?
    // Creación de la base de datos
	// Insertar en htdocs/instalacion, ejecutarlo y eliminar archivo
    // Uso de la clase mysqli

	$dbhost="localhost";
	$dbuser="root";
	$dbpass="1234";

    // Creacion de instancia y paso de parametros al constructor
	$c1 = new mysqli($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . $c1->error.'<br>');
		
	// Creación la base de datos si no existe
	$c1->query("CREATE DATABASE IF NOT EXISTS easydishes");

	// Usar la base de datos
	$c1->query("USE easydishes");

    // Creación de las tablas
	$c1->query("CREATE TABLE IF NOT EXISTS usuarios (
		dni varchar(255),
		nombre varchar(255),
		primerApellido varchar(255),
		segundoApellido varchar(255),
		telefono varchar(255),
		correo varchar(255),
		contrasenya varchar(255),
		PRIMARY KEY(dni)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS ingredientes (
		id varchar(255), 
		nombre varchar(255), 
		cantidad int, 
		unidad varchar(255), 
		PRIMARY KEY(id));");

	$c1->query("CREATE TABLE IF NOT EXISTS preparacion (
		id varchar(255),
		descripcion MEDIUMTEXT,
		PRIMARY KEY(id)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS recetas (
		id varchar(255),
		nombre varchar(255),
		fecha DATE,
		etapa varchar(255),
		imagen LONGTEXT,
		autor varchar(255),
		PRIMARY KEY(id),
		FOREIGN KEY (autor) REFERENCES usuarios(dni)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS listascompra (
		id varchar(255),
		fecha DATE,
		usuario varchar(255),
		PRIMARY KEY(id),
		FOREIGN KEY (usuario) REFERENCES usuarios(dni)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS mensajes (
		id varchar(255),
		texto varchar(255),
		fecha DATE,
		receta varchar(255),
		usuario varchar(255),
		PRIMARY KEY(id),
		FOREIGN KEY (usuario) REFERENCES usuarios(dni),
		FOREIGN KEY (receta) REFERENCES recetas(id)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS rp (
		receta varchar(255),
		preparacion varchar(255),
		orden int(4),
		PRIMARY KEY (receta, preparacion),
		FOREIGN KEY (preparacion) REFERENCES preparacion(id),
		FOREIGN KEY (receta) REFERENCES recetas(id)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS ri (
		receta varchar(255),
		ingrediente varchar(255),
		cantidad int(4),
		FOREIGN KEY (receta) REFERENCES recetas(id),
		FOREIGN KEY (ingrediente) REFERENCES ingredientes(id),
		PRIMARY KEY (receta, ingrediente)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS il (
		ingrediente varchar(255),
		lista varchar(255),
		cantidad int(4),
		FOREIGN KEY (ingrediente) REFERENCES ingredientes(id),
		FOREIGN KEY (lista) REFERENCES listascompra(id),
		PRIMARY KEY (ingrediente, lista)
	)");

	$c1->query("CREATE TABLE IF NOT EXISTS favoritos (
		receta varchar(255),
		usuario varchar(255),
		PRIMARY KEY (receta, usuario),
		FOREIGN KEY (receta) REFERENCES recetas(id),
		FOREIGN KEY (usuario) REFERENCES usuarios(dni)
	)");

	echo $c1->error;

?>