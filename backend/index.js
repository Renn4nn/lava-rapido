// server.js
import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Tela de todos os usuarios
app.get('/users', (req, res) => {
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

app.post('/removerServicos', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID do serviço é obrigatório" });
    }

    const q = "DELETE FROM servicos WHERE id = ?";
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("Erro ao excluir serviço:", err);
            return res.status(500).json({ error: "Erro ao excluir serviço" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Serviço não encontrado" });
        }

        console.log("Serviço excluído com sucesso");
        return res.status(200).json({ message: "Serviço excluído com sucesso" });
    });
});

app.delete('/removerTodosServicos', (req, res) => {
    const q = "DELETE FROM servicos";

    db.query(q, (err, result) => {
        if (err) {
            console.error("Erro ao excluir todos os serviços:", err);
            return res.status(500).json({ error: "Erro ao excluir todos os serviços" });
        }

        console.log("Todos os serviços foram excluídos.");
        return res.status(200).json({ message: "Todos os serviços foram excluídos com sucesso" });
    });
});



app.get('/servicosList', (req, res) => {
    const q = "SELECT * FROM servicos";
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data)
    })
})

app.post('/servicos', (req, res) => {
    const { tipoServico, placa, modelo, preco, cliente, funcionario, dataHora } = req.body;
    const q = "INSERT INTO servicos (tipo_servico, placa, modelo, preco, cliente, funcionario, data_hora) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(q, [tipoServico, placa, modelo, preco, cliente, funcionario, dataHora], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        console.log("REGISTRADO")
        return res.status(201).json({ message: "Serviço registrado com sucesso!" });
    })
})

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


//backend rodando no ip da rede local
app.listen(process.env.PORT, `${process.env.IP}`, () => {
    console.log(`Rodando servidor na porta ${process.env.PORT}`);
});
