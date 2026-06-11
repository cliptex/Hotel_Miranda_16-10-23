<?php
require_once __DIR__ . '/../../middleware/auth.php';
requireAuth();

$pdo = Database::getInstance();

if ($method === 'GET') {
    successResponse($pdo->query('SELECT * FROM brands ORDER BY name ASC')->fetchAll());
}

if ($method === 'POST') {
    $name = trim($body['name'] ?? '');
    if (!$name) errorResponse('Marka adı zorunludur');
    $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $name));
    $stmt = $pdo->prepare('INSERT INTO brands (name, slug, logo_url, is_active) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $slug, $body['logo_url'] ?? null, (int)($body['is_active'] ?? 1)]);
    successResponse(['id' => $pdo->lastInsertId()], 'Marka eklendi', 201);
}

if ($method === 'PUT' && isset($id)) {
    $stmt = $pdo->prepare('UPDATE brands SET name=?, logo_url=?, is_active=? WHERE id=?');
    $stmt->execute([$body['name'], $body['logo_url'] ?? null, (int)($body['is_active'] ?? 1), (int)$id]);
    successResponse(null, 'Marka güncellendi');
}

if ($method === 'DELETE' && isset($id)) {
    $pdo->prepare('DELETE FROM brands WHERE id=?')->execute([$id]);
    successResponse(null, 'Marka silindi');
}

errorResponse('Method not allowed', 405);
