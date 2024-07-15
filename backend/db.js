const mysql = require('mysql2');

// Crie a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '33015145', // Substitua 'sua_senha' pela senha do usuário root
    database: 'escola'
});

// Conecte ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});

// Código adicional para manipular o banco de dados
