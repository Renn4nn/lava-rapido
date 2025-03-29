import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json()); //aceitar json

// Rota POST para criar um novo usuário
app.post('/usuario', async (req, res) => {
    const { nome, email } = req.body; // exemplo de dados

    try {
        // Criando o usuário no banco de dados
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
            },
        });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Rota GET para listar os usuários
app.get('/usuario', async (req, res) => {
    try {
        // Buscando todos os usuários no banco de dados
        const usuarios = await prisma.usuario.findMany();

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
