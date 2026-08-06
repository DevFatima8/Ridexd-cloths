import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectionUrl =
  process.env.DATABASE_URL ||
  "mysql://u136488108_clothing:EcoM1234C@194.59.164.63:3306/u136488108_ecom";

async function main() {
  console.log("Connecting to MySQL database at 194.59.164.63...");
  const connection = await mysql.createConnection(connectionUrl);
  console.log("Connected successfully!");

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      reference VARCHAR(255) NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      notes TEXT,
      items JSON NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;

  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS store_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      compare_at DECIMAL(10, 2),
      category VARCHAR(255) NOT NULL,
      subcategory VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      colors JSON NOT NULL,
      sizes JSON NOT NULL,
      is_new TINYINT(1) DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;

  console.log("Creating 'orders' table...");
  await connection.query(createOrdersTable);
  console.log("'orders' table created or verified!");

  console.log("Creating 'store_products' table...");
  await connection.query(createProductsTable);
  console.log("'store_products' table created or verified!");

  const [tables] = await connection.query("SHOW TABLES;");
  console.log("Database tables:", JSON.stringify(tables));

  await connection.end();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Error creating tables:", err);
  process.exit(1);
});
