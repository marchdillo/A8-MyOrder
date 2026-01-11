-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
-- Tabel Menu
CREATE TABLE IF NOT EXISTS menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT UNSIGNED NOT NULL
);

-- Tabel Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_id) REFERENCES menus(id)
    ON DELETE CASCADE
);

-- Data awal menu
INSERT INTO menus (name, price) VALUES
('Burger', 20000),
('Fried Chicken', 25000),
('French Fries', 15000);


