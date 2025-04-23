// server.js
import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/users',(req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
})

app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(q, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(201).json({ message: "Usuário registrado com sucesso!" });
    });
});


const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Rodando servidor na porta ${PORT}`);
});
