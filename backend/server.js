const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '33015145',
    database: 'escola',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint de login
app.post('/login', (req, res) => {
    const { login, senha } = req.body;

    // Verifique as credenciais no banco de dados
    const query = 'SELECT * FROM alunos WHERE login = ? AND senha = ?';
    db.execute(query, [login, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            res.status(500).json({ error: 'Erro no servidor' });
            return;
        }

        if (results.length > 0) {
            const aluno = results[0];
            res.json(aluno);
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    });
});

// Endpoint para cadastrar um novo aluno
app.post('/cadastro', (req, res) => {
    const { nome, login, senha } = req.body;

    // Verificar se o login já existe
    const checkQuery = 'SELECT * FROM alunos WHERE login = ?';
    db.execute(checkQuery, [login], (err, results) => {
        if (err) {
            console.error('Erro ao verificar login:', err);
            res.status(500).json({ error: 'Erro no servidor' });
            return;
        }

        if (results.length > 0) {
            res.status(409).json({ error: 'Login já está em uso' });
        } else {
            // Inserir novo aluno no banco de dados
            const insertQuery = 'INSERT INTO alunos (nome, login, senha) VALUES (?, ?, ?)';
            db.execute(insertQuery, [nome, login, senha], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar aluno:', err);
                    res.status(500).json({ error: 'Erro no servidor' });
                    return;
                }
                // Retornar sucesso ao cadastrar
                res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
            });
        }
    });
});

// Endpoint para obter as notas do aluno
app.get('/aluno/:id/notas', (req, res) => {
    const alunoId = req.params.id;

    const query = `
        SELECT nome, disciplina_html_css, disciplina_bootstrap, disciplina_javascript,
               disciplina_nodejs, disciplina_reactjs, disciplina_mongodb,
               disciplina_mysql, disciplina_postgresql
        FROM alunos
        WHERE id = ?`;

    db.execute(query, [alunoId], (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            res.status(500).json({ error: 'Erro no servidor' });
            return;
        }

        if (results.length > 0) {
            const notas = results[0];
            res.json(notas);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    });
});

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
