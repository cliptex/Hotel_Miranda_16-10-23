<?php
require_once __DIR__ . '/../../middleware/auth.php';
requireAuth();

$pdo = Database::getInstance();

if ($method === 'GET') {
    $stmt = $pdo->query("
        SELECT p.*, b.name AS brand_name, c.name AS category_name,
            (SELECT image_url FROM product_images WHERE product_id=p.id AND is_primary=1 LIMIT 1) AS primary_image
        FROM products p JOIN brands b ON p.brand_id=b.id JOIN categories c ON p.category_id=c.id
        ORDER BY p.sort_order ASC, p.created_at DESC
    ");
    successResponse($stmt->fetchAll());
}

if ($method === 'POST') {
    $name = trim($body['name'] ?? '');
    if (!$name) errorResponse('Ürün adı zorunludur');

    $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', transliterator_transliterate('Any-Latin; Latin-ASCII', $name)));
    $slug = trim($slug, '-');

    // Ensure unique slug
    $check = $pdo->prepare('SELECT id FROM products WHERE slug = ?');
    $check->execute([$slug]);
    if ($check->fetch()) $slug .= '-' . time();

    $stmt = $pdo->prepare('INSERT INTO products (name, slug, brand_id, category_id, description, price, show_price, is_featured, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $name, $slug,
        (int)($body['brand_id'] ?? 0),
        (int)($body['category_id'] ?? 0),
        $body['description'] ?? '',
        $body['price'] ? (float)$body['price'] : null,
        (int)($body['show_price'] ?? 0),
        (int)($body['is_featured'] ?? 0),
        (int)($body['is_active'] ?? 1),
        (int)($body['sort_order'] ?? 0),
    ]);

    $productId = (int)$pdo->lastInsertId();

    // Save specs
    if (!empty($body['specs']) && is_array($body['specs'])) {
        $specStmt = $pdo->prepare('INSERT INTO product_specs (product_id, spec_key, spec_value, sort_order) VALUES (?, ?, ?, ?)');
        foreach ($body['specs'] as $i => $spec) {
            if (!empty($spec['key']) && !empty($spec['value'])) {
                $specStmt->execute([$productId, $spec['key'], $spec['value'], $i]);
            }
        }
    }

    successResponse(['id' => $productId], 'Ürün eklendi', 201);
}

if ($method === 'PUT' && isset($id)) {
    $stmt = $pdo->prepare('UPDATE products SET name=?, brand_id=?, category_id=?, description=?, price=?, show_price=?, is_featured=?, is_active=?, sort_order=?, updated_at=NOW() WHERE id=?');
    $stmt->execute([
        $body['name'] ?? '',
        (int)($body['brand_id'] ?? 0),
        (int)($body['category_id'] ?? 0),
        $body['description'] ?? '',
        $body['price'] ? (float)$body['price'] : null,
        (int)($body['show_price'] ?? 0),
        (int)($body['is_featured'] ?? 0),
        (int)($body['is_active'] ?? 1),
        (int)($body['sort_order'] ?? 0),
        (int)$id,
    ]);

    // Replace specs
    $pdo->prepare('DELETE FROM product_specs WHERE product_id = ?')->execute([$id]);
    if (!empty($body['specs']) && is_array($body['specs'])) {
        $specStmt = $pdo->prepare('INSERT INTO product_specs (product_id, spec_key, spec_value, sort_order) VALUES (?, ?, ?, ?)');
        foreach ($body['specs'] as $i => $spec) {
            if (!empty($spec['key']) && !empty($spec['value'])) {
                $specStmt->execute([$id, $spec['key'], $spec['value'], $i]);
            }
        }
    }

    successResponse(null, 'Ürün güncellendi');
}

if ($method === 'DELETE' && isset($id)) {
    $pdo->prepare('DELETE FROM products WHERE id = ?')->execute([$id]);
    successResponse(null, 'Ürün silindi');
}

errorResponse('Method not allowed', 405);
