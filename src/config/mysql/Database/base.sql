CREATE DATABASE tiendaveh; 
use tiendaveh;

CREATE TABLE vehiculos(
	id 		INT AUTO_INCREMENT PRIMARY KEY,
    marca	VARCHAR(30) NOT NULL,
    modelo 	VARCHAR(30) NOT NULL,
    color  	VARCHAR(20) NOT NULL,
    precio	DECIMAL(9,2) NOT NULL,
    placa	CHAR(7) NOT NULL,     -- UNICO
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL
)ENGINE INNODB;

INSERT INTO vehiculos VALUES
	(NULL, 'Nissan', 'Frontier', 'gris', 145000, 'ABC-111', NOW(), NOW(), NULL),
    (NULL, 'Toyota', 'Hilux', 'blanco', 98000, 'ABC-222', NOW(), NOW(), NULL);
    
SELECT * FROM vehiculos;