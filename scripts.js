document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const mensagem = document.getElementById('mensagem');
    const notasContainer = document.getElementById('notas-container');
    const notasList = document.getElementById('notas-list');
    const logoutButton = document.getElementById('logout-button');
    const cadastroLink = document.querySelector('.cadastro-link'); // Seleciona o link de cadastro

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const login = loginForm.login.value;
        const senha = loginForm.senha.value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, senha })
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error || 'Erro ao fazer login.');
            }

            const aluno = await response.json();
            console.log('Aluno logado:', aluno);

            // Obter as notas do aluno
            const notasResponse = await fetch(`http://localhost:3000/aluno/${aluno.id}/notas`);
            const notas = await notasResponse.json();
            console.log('Notas:', notas);

            // Exibir as notas na página
            mensagem.textContent = `Bem-vindo, ${aluno.nome}!`;
            notasList.innerHTML = `
                <li>HTML & CSS: ${notas.disciplina_html_css}</li>
                <li>Bootstrap: ${notas.disciplina_bootstrap}</li>
                <li>JavaScript: ${notas.disciplina_javascript}</li>
                <li>Node.js: ${notas.disciplina_nodejs}</li>
                <li>React JS: ${notas.disciplina_reactjs}</li>
                <li>MongoDB: ${notas.disciplina_mongodb}</li>
                <li>MySQL: ${notas.disciplina_mysql}</li>
                <li>PostgreSQL: ${notas.disciplina_postgresql}</li>
            `;

            // Mostrar o contêiner de notas e ocultar o formulário de login
            notasContainer.style.display = 'block';
            loginForm.style.display = 'none';
            cadastroLink.style.display = 'none'; // Ocultar o link de cadastro após o login

        } catch (error) {
            mensagem.textContent = error.message;
        }
    });

    // Logout
    logoutButton.addEventListener('click', () => {
        // Ocultar notas e botão de logout
        notasContainer.style.display = 'none';

        // Mostrar o formulário de login e o link de cadastro
        loginForm.style.display = 'flex';
        cadastroLink.style.display = 'block';
        mensagem.textContent = '';

        // Limpar campos de login e senha
        loginForm.login.value = '';
        loginForm.senha.value = '';
    });
});
