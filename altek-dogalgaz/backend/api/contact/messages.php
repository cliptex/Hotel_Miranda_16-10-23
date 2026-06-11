<?php
require_once __DIR__ . '/../../middleware/auth.php';
requireAuth();

$pdo = Database::getInstance();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    successResponse($stmt->fetchAll());
}

if ($method === 'PATCH' && isset($id)) {
    $stmt = $pdo->prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?');
    $stmt->execute([$id]);
    successResponse(null, 'Okundu olarak işaretlendi');
}

errorResponse('Method not allowed', 405);
