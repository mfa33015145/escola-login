// scripts.js

const loginForm = document.getElementById('login-form');
const mensagem = document.getElementById('mensagem');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = loginForm.login.value;
    const senha = loginForm.senha.value;

    try {
        const response = await fetch('/login', {
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

        // Redirecionar para a página de notas ou exibir as notas diretamente
        const notasResponse = await fetch(`/aluno/${aluno.id}/notas`);
        const notas = await notasResponse.json();
        console.log('Notas:', notas);
        // Exemplo de como você poderia manipular as notas no frontend
        // Aqui você pode redirecionar para outra página ou exibir as notas na mesma página

    } catch (error) {
        mensagem.textContent = error.message;
    }
});


fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: 'usuario', senha: 'senha' })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao fazer login');
    }
    return response.json();
})
.then(data => {
    console.log('Resposta do servidor:', data);
})
.catch(error => {
    console.error('Erro ao fazer requisição:', error);
});
