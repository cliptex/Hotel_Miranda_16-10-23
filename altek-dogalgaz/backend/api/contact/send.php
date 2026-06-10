<?php
if ($method !== 'POST') errorResponse('Method not allowed', 405);

$name = trim(htmlspecialchars($body['name'] ?? '', ENT_QUOTES, 'UTF-8'));
$email = filter_var(trim($body['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = trim(htmlspecialchars($body['phone'] ?? '', ENT_QUOTES, 'UTF-8'));
$message = trim(htmlspecialchars($body['message'] ?? '', ENT_QUOTES, 'UTF-8'));

if (!$name || !$email || !$message) {
    errorResponse('Ad, e-posta ve mesaj alanları zorunludur');
}

$pdo = Database::getInstance();
$stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $email, $phone, $message]);

successResponse(null, 'Mesajınız alındı. En kısa sürede dönüş yapacağız.', 201);
