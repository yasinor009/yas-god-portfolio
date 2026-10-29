<?php
/** Read-only local PHP/PDO demo. Requires PHP 8+ and pdo_sqlite. */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'Only GET is supported in this demo.']);
    exit;
}
$search = $_GET['search'] ?? '';
if (!is_string($search) || strlen($search) > 100) {
    http_response_code(400);
    echo json_encode(['error' => 'Search must be text up to 100 bytes.']);
    exit;
}
try {
    $db = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $db->exec('CREATE TABLE medicines (sku TEXT PRIMARY KEY, name TEXT NOT NULL, quantity INTEGER NOT NULL CHECK(quantity >= 0))');
    $insert = $db->prepare('INSERT INTO medicines VALUES (?, ?, ?)');
    foreach ([['MED-001', 'Amoxicillin', 42], ['MED-002', 'Paracetamol', 76], ['MED-003', 'Cetirizine', 8]] as $row) {
        $insert->execute($row);
    }
    $query = $db->prepare('SELECT sku, name, quantity FROM medicines WHERE name LIKE :name OR sku LIKE :sku ORDER BY sku');
    $query->execute(['name' => '%' . $search . '%', 'sku' => '%' . $search . '%']);
    echo json_encode(['demo' => true, 'items' => $query->fetchAll(PDO::FETCH_ASSOC)], JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['error' => 'Local demo unavailable. Check PHP and pdo_sqlite setup.']);
}
