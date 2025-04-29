import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();


//conexão com o MySQL
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: "lava_rapido_users",
    port: process.env.DB_PORT || 3000
});

// Conecta ao banco
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log(`Conectado ao banco de dados MySQL na porta ${process.env.DB_PORT}!`);
    }
});

export default db;
