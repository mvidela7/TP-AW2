
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    producto VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    imagen VARCHAR(255)
);

INSERT INTO productos (producto, precio, imagen) VALUES
    ('iPhone 17', 999.99, ''),
    ('iPhone 17 Pro', 1299.99, ''),
    ('MacBook', 1499.99, '');
