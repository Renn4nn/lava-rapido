import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "roserenan",
    database: "lava_rapido_users",
});

export default db;