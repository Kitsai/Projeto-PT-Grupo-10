document.getElementById('botao_cadastro').addEventListener('click', criarCadastro);

async function criarCadastro() {
    console.log("botão clicado")
    const username = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nome = document.getElementById('nome').value;
    const gender = document.getElementById('genero').value;
    const jobTitle = document.getElementById('cargo').value;
    const profile_picture = ''

    const novoUsuario = {
        username,
        email,
        password,
        nome,
        gender,
        jobTitle,
        profile_picture,
    
    };

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario),
        });
    
        const data = await response.json();
        console.log('Cadastro bem-sucedido', data);
        window.location.href = "../home/página de login.html";
    } catch (error) {
        console.error('Erro no cadastro', error);
    }
}