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

// Configuración de Supabase
$supabase_url = 'https://tvukfobcjthbbsetfzng.supabase.co';
$supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dWtmb2JjanRoYmJzZXRmem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjY5OTAsImV4cCI6MjA3OTIwMjk5MH0.l9e_v_X2Vnyy76-7u8FYqTRlgiKuwLvO-DCu_5Ern3c';
$table_name = 'contactos';

// Preparar datos para insertar
$data = [
    'name' => $name,
    'email' => $email,
    'company' => $company ? $company : null,
    'subject' => $subject,
    'message' => $message
];

// Insertar datos en Supabase usando REST API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $supabase_url . '/rest/v1/' . $table_name);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $supabase_key,
    'Authorization: Bearer ' . $supabase_key,
    'Content-Type: application/json',
    'Prefer: return=representation'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Verificar respuesta de Supabase
if ($http_code >= 200 && $http_code < 300) {
    // Enviar email de notificación usando SendGrid
    $sendgrid_api_key = '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';
    $sendgrid_url = 'https://api.sendgrid.com/v3/mail/send';
    
    // Construir el cuerpo del email
    $email_body = "Nuevo contacto recibido desde el sitio web de Kora CRM\n\n";
    $email_body .= "Nombre: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Empresa: " . ($company ? $company : 'No especificada') . "\n";
    $email_body .= "Asunto: " . $subject . "\n\n";
    $email_body .= "Mensaje:\n" . $message . "\n";
    
    // Preparar datos para SendGrid
    $email_data = [
        'personalizations' => [
            [
                'to' => [
                    [
                        'email' => 'spsolutions.app@gmail.com',
                        'name' => 'SP Solutions'
                    ]
                ],
                'subject' => 'Nuevo contacto desde Kora CRM - ' . $subject
            ]
        ],
        'from' => [
            'email' => 'spsolutions.app@gmail.com',
            'name' => 'Kora CRM'
        ],
        'reply_to' => [
            'email' => $email,
            'name' => $name
        ],
        'content' => [
            [
                'type' => 'text/plain',
                'value' => $email_body
            ]
        ]
    ];
    
    // Enviar email usando SendGrid API
    $ch_email = curl_init();
    curl_setopt($ch_email, CURLOPT_URL, $sendgrid_url);
    curl_setopt($ch_email, CURLOPT_POST, true);
    curl_setopt($ch_email, CURLOPT_POSTFIELDS, json_encode($email_data));
    curl_setopt($ch_email, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch_email, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $sendgrid_api_key,
        'Content-Type: application/json'
    ]);
    
    $email_response = curl_exec($ch_email);
    $email_http_code = curl_getinfo($ch_email, CURLINFO_HTTP_CODE);
    curl_close($ch_email);
    
    // Responder éxito (aunque el email falle, los datos ya están guardados)
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
    ]);
} else {
    http_response_code(500);
    $error_message = 'Error al enviar el mensaje. Por favor intenta nuevamente.';
    if ($curl_error) {
        $error_message .= ' Error: ' . $curl_error;
    }
    if ($response) {
        $error_data = json_decode($response, true);
        if (isset($error_data['message'])) {
            $error_message .= ' ' . $error_data['message'];
        }
    }
    echo json_encode([
        'success' => false, 
        'message' => $error_message
    ]);
}