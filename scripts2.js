const cadastroForm = document.getElementById('cadastro-form');
        const mensagem = document.getElementById('mensagem');

        cadastroForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = cadastroForm.nome.value;
            const login = cadastroForm.login.value;
            const senha = cadastroForm.senha.value;

            try {
                const response = await fetch('http://localhost:3000/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, login, senha })
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.error || 'Erro ao cadastrar.');
                }

                // Exibir mensagem de sucesso
                mensagem.textContent = 'Cadastro realizado com sucesso!';
                cadastroForm.reset();

            } catch (error) {
                mensagem.textContent = error.message;
            }
        });