<?php
function jsonResponse(mixed $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function successResponse(mixed $data, string $message = 'Başarılı', int $status = 200): void {
    jsonResponse(['success' => true, 'message' => $message, 'data' => $data], $status);
}

function errorResponse(string $message, int $status = 400): void {
    jsonResponse(['success' => false, 'message' => $message], $status);
}

function notFoundResponse(string $message = 'Bulunamadı'): void {
    errorResponse($message, 404);
}
