<?php
require_once __DIR__ . '/../../middleware/auth.php';
requireAuth();

$pdo = Database::getInstance();

if ($method === 'GET') {
    successResponse($pdo->query('SELECT * FROM categories ORDER BY name ASC')->fetchAll());
}

if ($method === 'POST') {
    $name = trim($body['name'] ?? '');
    if (!$name) errorResponse('Kategori adı zorunludur');
    $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $name));
    $stmt = $pdo->prepare('INSERT INTO categories (name, slug, icon, is_active) VALUES (?, ?, ?, ?)');
    $stmt->execute([$name, $slug, $body['icon'] ?? 'Flame', (int)($body['is_active'] ?? 1)]);
    successResponse(['id' => $pdo->lastInsertId()], 'Kategori eklendi', 201);
}

if ($method === 'PUT' && isset($id)) {
    $stmt = $pdo->prepare('UPDATE categories SET name=?, icon=?, is_active=? WHERE id=?');
    $stmt->execute([$body['name'], $body['icon'] ?? 'Flame', (int)($body['is_active'] ?? 1), (int)$id]);
    successResponse(null, 'Kategori güncellendi');
}

if ($method === 'DELETE' && isset($id)) {
    $pdo->prepare('DELETE FROM categories WHERE id=?')->execute([$id]);
    successResponse(null, 'Kategori silindi');
}

errorResponse('Method not allowed', 405);
