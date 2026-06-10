<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

use Firebase\JWT\JWT;

if ($method !== 'POST') {
    errorResponse('Method not allowed', 405);
}

$username = trim($body['username'] ?? '');
$password = $body['password'] ?? '';

if (!$username || !$password) {
    errorResponse('Kullanıcı adı ve şifre gerekli');
}

// Rate limiting via session
session_start();
$attempts = $_SESSION['login_attempts'] ?? 0;
$lastAttempt = $_SESSION['last_attempt'] ?? 0;

if ($attempts >= 3 && (time() - $lastAttempt) < 300) {
    errorResponse('Çok fazla hatalı giriş. 5 dakika bekleyin.', 429);
}

$pdo = Database::getInstance();
$stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $_SESSION['login_attempts'] = $attempts + 1;
    $_SESSION['last_attempt'] = time();
    errorResponse('Kullanıcı adı veya şifre hatalı', 401);
}

$_SESSION['login_attempts'] = 0;
$pdo->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')->execute([$user['id']]);

$secret = $_ENV['JWT_SECRET'] ?? 'altek_jwt_secret_2024';
$payload = [
    'iss' => 'altek-dogalgaz',
    'iat' => time(),
    'exp' => time() + 86400,
    'sub' => $user['id'],
    'username' => $user['username'],
];

$token = JWT::encode($payload, $secret, 'HS256');
successResponse(['token' => $token, 'user' => ['id' => $user['id'], 'username' => $user['username']]]);
