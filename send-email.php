<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validar campos requeridos
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor completa todos los campos requeridos']);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Email de destino
$to = 'spsolutions.app@gmail.com';

// Asunto del email
$email_subject = 'Nuevo contacto desde Kora CRM - ' . $subject;

// Construir el cuerpo del mensaje
$email_body = "Nuevo contacto recibido desde el sitio web de Kora CRM\n\n";
$email_body .= "Nombre: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Empresa: " . ($company ? $company : 'No especificada') . "\n";
$email_body .= "Asunto: " . $subject . "\n\n";
$email_body .= "Mensaje:\n" . $message . "\n";

// Headers del email
$headers = "From: noreply@spsolutions.app\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Intentar enviar el email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Por favor intenta nuevamente.'
    ]);
}
?>

