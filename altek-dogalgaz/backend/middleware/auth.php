<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../helpers/response.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function requireAuth(): array {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!str_starts_with($authHeader, 'Bearer ')) {
        errorResponse('Yetkisiz erişim', 401);
    }

    $token = substr($authHeader, 7);
    $secret = $_ENV['JWT_SECRET'] ?? 'altek_jwt_secret_2024';

    try {
        $decoded = JWT::decode($token, new Key($secret, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        errorResponse('Geçersiz token', 401);
    }
}
