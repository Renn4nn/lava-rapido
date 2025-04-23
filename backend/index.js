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

//Tela de todos os usuarios
app.get('/users',(req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
})

//Criação de usuario
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(q, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(201).json({ message: "Usuário registrado com sucesso!" });
    });
});

//login do usuario
app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    const q = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(q, [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: "Erro no servidor." });
  
      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos." });
      }
  
      return res.status(200).json({ message: "Login realizado com sucesso!", user: results[0] });
    });
  });
  

const PORT = 8800;
//backend rodando no ip da rede local
app.listen(PORT, '192.168.0.130', () => {
    console.log(`Rodando servidor na porta ${PORT}`);
});
