<?php
if ($method !== 'GET') errorResponse('Method not allowed', 405);

$slug = $sub;
$pdo = Database::getInstance();

$stmt = $pdo->prepare("
    SELECT p.*, b.name AS brand_name, b.slug AS brand_slug, b.logo_url AS brand_logo,
        c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
    FROM products p
    JOIN brands b ON p.brand_id = b.id
    JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ? AND p.is_active = 1
");
$stmt->execute([$slug]);
$product = $stmt->fetch();

if (!$product) notFoundResponse('Ürün bulunamadı');

$imgStmt = $pdo->prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC');
$imgStmt->execute([$product['id']]);
$product['images'] = $imgStmt->fetchAll();

$specStmt = $pdo->prepare('SELECT spec_key, spec_value FROM product_specs WHERE product_id = ? ORDER BY sort_order ASC');
$specStmt->execute([$product['id']]);
$product['specs'] = $specStmt->fetchAll();

$relStmt = $pdo->prepare("
    SELECT p.id, p.name, p.slug, b.name AS brand_name,
        (SELECT image_url FROM product_images WHERE product_id=p.id AND is_primary=1 LIMIT 1) AS primary_image
    FROM products p JOIN brands b ON p.brand_id=b.id
    WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1
    LIMIT 4
");
$relStmt->execute([$product['category_id'], $product['id']]);
$product['related'] = $relStmt->fetchAll();

successResponse($product);
