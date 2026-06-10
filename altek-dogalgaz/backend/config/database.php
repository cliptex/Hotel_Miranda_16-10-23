<?php
class Database {
    private static ?PDO $instance = null;

    private static function getDsn(): string {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $name = $_ENV['DB_NAME'] ?? 'altek_dogalgaz';
        $charset = 'utf8mb4';
        return "mysql:host=$host;dbname=$name;charset=$charset";
    }

    public static function getInstance(): PDO {
        if (self::$instance === null) {
            $user = $_ENV['DB_USER'] ?? 'root';
            $pass = $_ENV['DB_PASS'] ?? '';
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            self::$instance = new PDO(self::getDsn(), $user, $pass, $options);
        }
        return self::$instance;
    }
}
