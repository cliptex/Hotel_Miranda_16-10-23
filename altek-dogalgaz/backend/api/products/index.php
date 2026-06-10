<?php
if ($method !== 'GET') errorResponse('Method not allowed', 405);

$pdo = Database::getInstance();

$where = ['p.is_active = 1'];
$params = [];

if (!empty($_GET['brand'])) {
    $where[] = 'b.slug = ?';
    $params[] = $_GET['brand'];
}
if (!empty($_GET['category'])) {
    $where[] = 'c.slug = ?';
    $params[] = $_GET['category'];
}
if (!empty($_GET['q'])) {
    $where[] = 'p.name LIKE ?';
    $params[] = '%' . $_GET['q'] . '%';
}
if (!empty($_GET['featured'])) {
    $where[] = 'p.is_featured = 1';
}

$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = 12;
$offset = ($page - 1) * $perPage;

$whereClause = implode(' AND ', $where);

$countStmt = $pdo->prepare("SELECT COUNT(*) FROM products p JOIN brands b ON p.brand_id=b.id JOIN categories c ON p.category_id=c.id WHERE $whereClause");
$countStmt->execute($params);
$total = (int)$countStmt->fetchColumn();

$stmt = $pdo->prepare("
    SELECT p.*, b.name AS brand_name, b.slug AS brand_slug, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon,
        (SELECT image_url FROM product_images WHERE product_id=p.id AND is_primary=1 LIMIT 1) AS primary_image
    FROM products p
    JOIN brands b ON p.brand_id = b.id
    JOIN categories c ON p.category_id = c.id
    WHERE $whereClause
    ORDER BY p.sort_order ASC, p.created_at DESC
    LIMIT $perPage OFFSET $offset
");
$stmt->execute($params);
$products = $stmt->fetchAll();

successResponse([
    'items' => $products,
    'total' => $total,
    'page' => $page,
    'per_page' => $perPage,
    'total_pages' => (int)ceil($total / $perPage),
]);
