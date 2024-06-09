<?
	if(isset($_POST["aceptar"])) {
		// En una imagen que recogeremos desde el explorador de archivos, la representaremos en un lienzo centrada (con tamaño proporcional)
		// y en el margen inferior y centrado incluiremos una leyenda que recogeremos también de un formulario. El lienzo
		// debe ser grande
		header("Content-type: image/jpeg");
		// Cargar imagen
		// Obtener ruta de imagen
		$ruta_temp = $_FILES["foto"]["tmp_name"];
		// Obtener nombre del archivo de imagen
		$nombre_archivo = $_FILES["foto"]["name"];
		// Establecer rutas
		$ruta_destino = "C:/Apache24/htdocs/img/" . $nombre_archivo;
		$ruta_web = "img/" . $nombre_archivo;
		// Mover archivo a otro lugar para almacenarlo
		move_uploaded_file($ruta_temp, $ruta_destino);
		// Abrir imagen
		$imagen = imagecreatefromjpeg($ruta_web);
		// Obtener coordanadas x e y de la imagen
		$coord_x_original = imagesx($imagen);
		$coord_y_original = imagesy($imagen);

		// Creamos fondo donde va a ir la imagen y el texto
		$fondo = imagecreatetruecolor($coord_x_original + 100, $coord_y_original + 30);
		$color_fondo = imagecolorallocate($fondo, 0, 0, 0);

		// Añadimos la imagen de fondo
		imagecopyresampled($fondo, $imagen, 200, 0, 255, 255, $coord_x_original, $coord_y_original, $coord_x_original, $coord_y_original);

		// Añadimos letrero
		$fuente = "C:\Apache24\htdocs\FuentesTT\ahoma.ttf";
		$blanco = imagecolorallocate($imagen, 255, 255, 255);
		// Calculamos la posición central
		$caja_texto = imagettfbbox(60, 0, $fuente, $_POST["letrero"]);
		$pos_x_centrado = ($coord_x_original / 2) - (($caja_texto[2] - $caja_texto[0]) / 2);
		imagettftext($fondo, 60, 0, $pos_x_centrado, $coord_y_original + 10, $blanco, $fuente, $_POST["letrero"]);

		//Enviamos imagen
		imagejpeg($fondo);
		// ... y la destruimos
		imagedestroy($fondo);
	} else {
		?>
			<!DOCTYPE html>
			<html lang="en">

			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Foto de clase</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
				<style>
					div {
						width: 500px;
						height: 500px;
						background-color: transparent;

						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;

						margin: auto;
					}
				</style>
			</head>

			<body>
				<div>
					<form enctype="multipart/form-data" action="" method="post">
						<label for="foto">Fotografía: </label>
						<input class="form-control" type="file" name="foto" id="foto"/>
						<br>
						<label for="nombre">Letrero:</label>
						<input type="text" class="form-control" id="letrero" name="letrero">
						<input type="submit" name="aceptar" value="Aceptar" class="btn btn-primary mb-3" id="aceptar"/>
					</form>
				</div>
			</body>

			</html>
		<?
	}
?>

