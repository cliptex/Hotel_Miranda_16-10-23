<?php
require_once __DIR__ . '/../../middleware/auth.php';
requireAuth();

$pdo = Database::getInstance();

if ($method === 'POST') {
    if (empty($_FILES['image'])) errorResponse('Dosya yüklenmedi');

    $file = $_FILES['image'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    $maxSize = 5 * 1024 * 1024; // 5MB

    if (!in_array($file['type'], $allowedTypes)) errorResponse('Sadece JPG, PNG ve WebP formatları desteklenir');
    if ($file['size'] > $maxSize) errorResponse('Dosya boyutu 5MB\'ı geçemez');

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = bin2hex(random_bytes(16)) . '.' . strtolower($ext);
    $uploadDir = __DIR__ . '/../../uploads/';

    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    if (!move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
        errorResponse('Dosya yüklenemedi');
    }

    $imageUrl = '/uploads/' . $filename;
    $productId = (int)($_POST['product_id'] ?? 0);
    $isPrimary = (int)($_POST['is_primary'] ?? 0);

    $stmt = $pdo->prepare('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)');
    $stmt->execute([$productId, $imageUrl, $isPrimary]);

    successResponse(['id' => $pdo->lastInsertId(), 'image_url' => $imageUrl], 'Fotoğraf yüklendi', 201);
}

if ($method === 'DELETE' && isset($id)) {
    $stmt = $pdo->prepare('SELECT image_url FROM product_images WHERE id = ?');
    $stmt->execute([$id]);
    $image = $stmt->fetch();

    if ($image) {
        $filePath = __DIR__ . '/../../uploads/' . basename($image['image_url']);
        if (file_exists($filePath)) unlink($filePath);
        $pdo->prepare('DELETE FROM product_images WHERE id = ?')->execute([$id]);
    }

    successResponse(null, 'Fotoğraf silindi');
}

errorResponse('Method not allowed', 405);
