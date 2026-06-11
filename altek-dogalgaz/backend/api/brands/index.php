<?php
if ($method !== 'GET') errorResponse('Method not allowed', 405);

$pdo = Database::getInstance();
$stmt = $pdo->query('SELECT * FROM brands WHERE is_active = 1 ORDER BY name ASC');
successResponse($stmt->fetchAll());
