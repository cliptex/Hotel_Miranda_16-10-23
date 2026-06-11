-- Altek Doğalgaz Database
-- MySQL 8.0+

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS altek_dogalgaz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE altek_dogalgaz;

-- --------------------------------------------------------
-- Table: brands
-- --------------------------------------------------------
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `brands` (`name`, `slug`, `logo_url`, `is_active`) VALUES
('ECA', 'eca', NULL, 1),
('Baymak', 'baymak', NULL, 1),
('Demirdöküm', 'demirdokum', NULL, 1),
('Bosch', 'bosch', NULL, 1),
('Vaillant', 'vaillant', NULL, 1),
('Ariston', 'ariston', NULL, 1),
('Ferroli', 'ferroli', NULL, 1),
('Buderus', 'buderus', NULL, 1);

-- --------------------------------------------------------
-- Table: categories
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `icon` varchar(50) DEFAULT 'Flame',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`name`, `slug`, `icon`, `is_active`) VALUES
('Kombi', 'kombi', 'Flame', 1),
('Fırın', 'firin', 'ChefHat', 1),
('Termostat', 'termostat', 'Thermometer', 1),
('Su Isıtıcı', 'su-isitici', 'Droplets', 1),
('Ocak', 'ocak', 'Flame', 1),
('Şofben', 'sofben', 'Zap', 1);

-- --------------------------------------------------------
-- Table: products
-- --------------------------------------------------------
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `show_price` tinyint(1) NOT NULL DEFAULT 0,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`name`, `slug`, `brand_id`, `category_id`, `description`, `price`, `show_price`, `is_featured`, `is_active`, `sort_order`) VALUES
('ECA Calora 24 kW Kombi', 'eca-calora-24kw-kombi', 1, 1, 'ECA Calora serisi yoğuşmalı kombi. Yüksek verimli, sessiz çalışma, dijital ekran ile kolay kullanım. Akıllı ev sistemleri ile uyumlu.', 15500.00, 1, 1, 1, 1),
('Baymak Luna Duo 24 Fi', 'baymak-luna-duo-24fi', 2, 1, 'Baymak Luna Duo serisi yoğuşmalı kombi. Üstün teknoloji ve tasarımı ile öne çıkan model. 5 yıl garantili.', 17800.00, 1, 1, 1, 2),
('Demirdöküm DemirProf 28', 'demirdokum-demirprof-28', 3, 1, 'Demirdöküm profesyonel serisi 28 kW kombi. Büyük hacimli mekânlar için ideal, güçlü ve dayanıklı yapısı ile öne çıkar.', 19200.00, 0, 1, 1, 3),
('Bosch Condens 7000i W', 'bosch-condens-7000i-w', 4, 1, 'Bosch Condens 7000i W yoğuşmalı duvar tipi kombi. Almanya menşeli teknoloji ile güvenilir ısınma çözümü.', 21500.00, 1, 1, 1, 4),
('ECA Termostat Dijital', 'eca-termostat-dijital', 1, 3, 'ECA dijital oda termostatı. Haftalık programlama, LCD ekran, pil ile çalışır. Tüm kombi markalarıyla uyumlu.', 850.00, 1, 0, 1, 5),
('Baymak Aqua 80 Litre', 'baymak-aqua-80-litre', 2, 4, 'Baymak Aqua serisi 80 litre elektrikli su ısıtıcı. Kalın yalıtım, uzun ömürlü anot çubuğu ile ekonomik kullanım.', 4200.00, 1, 0, 1, 6),
('Vaillant VU 24CS/1-5', 'vaillant-vu-24cs-1-5', 5, 1, 'Vaillant turboTEC pro serisi 24 kW yoğuşmalı kombi. Akıllı tanılama sistemi, çevre dostu düşük emisyon değerleri.', 22000.00, 0, 1, 1, 7),
('Ariston Clas One 24', 'ariston-clas-one-24', 6, 1, 'Ariston Clas One 24 kW kombi. İtalyan tasarım ve teknolojisi, kompakt yapısı ile küçük mekânlara uygun.', 16500.00, 1, 0, 1, 8);

-- --------------------------------------------------------
-- Table: product_images
-- --------------------------------------------------------
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `fk_image_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: product_specs
-- --------------------------------------------------------
CREATE TABLE `product_specs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `spec_key` varchar(100) NOT NULL,
  `spec_value` varchar(255) NOT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `fk_spec_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_specs` (`product_id`, `spec_key`, `spec_value`, `sort_order`) VALUES
(1, 'Kapasite', '24 kW', 1),
(1, 'Verim', '%109', 2),
(1, 'Gaz Tipi', 'Doğalgaz/LPG', 3),
(1, 'Garanti', '3 Yıl', 4),
(1, 'Ağırlık', '28 kg', 5),
(2, 'Kapasite', '24 kW', 1),
(2, 'Verim', '%108.5', 2),
(2, 'Gaz Tipi', 'Doğalgaz', 3),
(2, 'Garanti', '5 Yıl', 4),
(2, 'Ağırlık', '30 kg', 5),
(3, 'Kapasite', '28 kW', 1),
(3, 'Verim', '%107', 2),
(3, 'Gaz Tipi', 'Doğalgaz/LPG', 3),
(3, 'Garanti', '3 Yıl', 4),
(4, 'Kapasite', '24 kW', 1),
(4, 'Verim', '%109.3', 2),
(4, 'Gaz Tipi', 'Doğalgaz', 3),
(4, 'Garanti', '5 Yıl', 4);

-- --------------------------------------------------------
-- Table: admin_users
-- --------------------------------------------------------
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin: username=admin, password=Altek2024!
INSERT INTO `admin_users` (`username`, `password_hash`) VALUES
('admin', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- --------------------------------------------------------
-- Table: contact_messages
-- --------------------------------------------------------
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
