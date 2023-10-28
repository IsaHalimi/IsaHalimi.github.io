<form action="action_page.php" method="POST">
    <!-- Ihre Formularelemente hier -->
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <input type="submit" value="Senden">
</form>

<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

// Nachricht per Mail
    mail('isa.halimi90@gmail.com', 'Neue Nachricht von der Webseite', $message, 'From: ' . $email);

    echo 'Nachricht erfolgreich gesendet.';
} else {
    echo 'Fehler: Ungültige Anforderung.';
}

$spamWords = ['fuck', 'shit'];
$message = $_POST['message'];

foreach ($spamWords as $word) {
    if (strpos($message, $word) !== false) {
        echo "Spam-Nachricht erkannt";
        return;
    }
}

$recaptchaSecret = '6LfBnQkoAAAAANNIVyUjAUeReVycnau19m0qkMDh';
$recaptchaResponse = $_POST['g-recaptcha-response'];

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
$responseKeys = json_decode($response, true);

if(intval($responseKeys["success"]) !== 1) {
    echo 'Bitte bestätigen Sie, dass Sie kein Roboter sind.';
} else {
    echo 'CAPTCHA bestanden';
}

$to = $_POST['email'];
$subject = "Bestätigung Ihrer Nachricht";
$message = "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.";
$headers = "From: isa.halimi90@gmail.com";

mail($to, $subject, $message, $headers);

$hour = date('H');
$to = $_POST['email'];
$subject = "Automatische Antwort";
$headers = "From: isa.halimi90@gmail.comm";

if ($hour >= 9 && $hour < 17) {
    $message = "Vielen Dank für Ihre Nachricht. Wir werden uns bald während der Geschäftszeiten bei Ihnen melden.";
} else {
    $message = "Vielen Dank für Ihre Nachricht. Wir werden uns am nächsten Werktag bei Ihnen melden.";
}

mail($to, $subject, $message, $headers);



?>
