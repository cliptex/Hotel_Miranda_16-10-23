<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

// Load .env
$envFile = __DIR__ . '/../../.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        $_ENV[$key] = $value;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$path = trim($_GET['path'] ?? '', '/');
$segments = explode('/', $path);

// Remove 'api' prefix if present
if ($segments[0] === 'api') array_shift($segments);

$resource = $segments[0] ?? '';
$sub = $segments[1] ?? '';
$id = $segments[2] ?? null;

// Parse JSON body
$body = json_decode(file_get_contents('php://input'), true) ?? [];

header('Content-Type: application/json; charset=utf-8');

// Route mapping
match (true) {
    $resource === 'auth' && $sub === 'login'         => require __DIR__ . '/auth/login.php',
    $resource === 'products' && !$sub                => require __DIR__ . '/products/index.php',
    $resource === 'products' && $sub                 => require __DIR__ . '/products/show.php',
    $resource === 'brands'                           => require __DIR__ . '/brands/index.php',
    $resource === 'categories'                       => require __DIR__ . '/categories/index.php',
    $resource === 'contact' && $sub === 'send'       => require __DIR__ . '/contact/send.php',
    $resource === 'admin' && $sub === 'products'     => require __DIR__ . '/products/admin.php',
    $resource === 'admin' && $sub === 'brands'       => require __DIR__ . '/brands/admin.php',
    $resource === 'admin' && $sub === 'categories'   => require __DIR__ . '/categories/admin.php',
    $resource === 'admin' && $sub === 'images'       => require __DIR__ . '/images/upload.php',
    $resource === 'admin' && $sub === 'messages'     => require __DIR__ . '/contact/messages.php',
    default                                          => notFoundResponse('Endpoint bulunamadı'),
};
