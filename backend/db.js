// db.js
import mysql from "mysql";

// Cria a conexão com o MySQL
export const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234", // Corrigido aqui
    database: "lava_rapido_users", // Certifique-se que esse banco existe
});

// Conecta ao banco
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados MySQL!");
    }
});

export default db;
