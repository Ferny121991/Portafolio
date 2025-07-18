<?php
// Allow cross-origin requests (CORS) for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $json_data = file_get_contents('php://input');
    
    // Decode the JSON data
    $data = json_decode($json_data, true);
    
    // Check if JSON decoding was successful
    if ($data === null) {
        http_response_code(400);
        echo "Error: Invalid JSON data";
        exit;
    }
    
    // Extract form data
    $name = isset($data['name']) ? $data['name'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $message = isset($data['message']) ? $data['message'] : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Error: All fields are required";
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Error: Invalid email format";
        exit;
    }
    
    // Configure email parameters
    // Change this to your email where you want to receive messages
    $destinatario = "fernelydev@gmail.com"; 
    $asunto = "New message from your portfolio website";
    
    // Email body
    $cuerpo = "Name: $name\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        http_response_code(200);
        echo "Message sent successfully. Thank you for contacting me!";
    } else {
        http_response_code(500);
        echo "Error: Failed to send message. Please try again later.";
    }
} else {
    // If someone tries to access this file directly without POST
    http_response_code(405);
    echo "Error: Method not allowed";
}
?>
