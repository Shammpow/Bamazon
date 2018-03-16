CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lightbulb', 'Lighting', 5, 100),
('Computer Mouse', 'Electronics', 15, 20),
('Headphones', 'Electronics', 10, 30),
('Shampoo', 'Personal Hygiene', 4.50, 25),
('Socks', 'Clothing', 6.75, 50),
('Conditioner', 'Personal Hygiene', 4.25, 25),
('Sweater', 'Clothing', 14.50, 15),
('LED bulb', 'Lighting', 8.25, 35),
('Washcloth', 'Personal Hygiene', 1.25, 60),
('T-shirt', 'Clothing', 8.75, 20);