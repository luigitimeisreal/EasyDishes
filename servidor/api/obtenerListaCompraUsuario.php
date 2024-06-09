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

    // Obtener la ID de la lista de la compra del usuario
    // SELECT ID from Listas WHERE usuario=$_GET["usuario"]
    $id = 1;

    // Obtener los ingredientes basados en el ID
    // SELECT Nombre FROM Ingredientes, I-L WHERE I-L.IDListas=id AND I-L.IDIngredientes=Ingredientes.ID
?>