<?php
$field_name = $_POST['name'];
$field_email = $_POST['email'];
$field_message = $_POST['message'];

$mail_to = 'daskultural@gmail.com';
$subject = 'Contacto formulario Das Bibliotek'.$field_name;

$body_message = 'De: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Mensaje: '.$field_message;

$headers = 'De: '.$field_email."\r\n";
$headers .= 'Respuesta a: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('¡Gacias por tu mensaje! <3.');
		window.location = 'index.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Algo ha fallado :c Por favor, escríbeme a daskultural@gmail.com');
		window.location = 'index.html';
	</script>
<?php
}
?>
