<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit
        http_response_code(400);
        echo "Por favor complete el formulario e intente nuevamente.";
        exit;
    }

    // Set the recipient email address
    // REPLACE this with your actual email address
    $recipient = "contacto@tuempresa.com";

    // Set the email subject
    $subject = "Nuevo mensaje de $name";

    // Build the email content
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Redirect to thank you page
        header("Location: ../gracias.html");
        exit;
    } else {
        // Set a 500 (internal server error) response code
        http_response_code(500);
        echo "Oops! Algo salió mal, no pudimos enviar tu mensaje.";
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor intenta nuevamente.";
}
?>

