const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST || "db_service",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "rootpassword",
  database: process.env.DB_NAME || "myorder",
};

let connection;

function connectWithRetry() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("❌ DB connection failed, retrying in 3s:", err.message);
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("✅ Connected to MySQL database");
    }
  });
}

connectWithRetry();

module.exports = connection;






