document.getElementById('botao_cadastro').addEventListener('click', criarCadastro);

function criarCadastro() {
    console.log("botão clicado")
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    const cargo = document.getElementById('cargo').value;

    const novoUsuario = {
        usuario,
        email,
        senha,
        nome,
        genero,
        cargo,
    
    };

    //enviar os dados
    fetch('http://localhost:3000/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro bem-sucedido', data);
        window.location.href = '../home/página de login.html';

    })
    .catch(error => {
        console.error('Erro no cadastro', error);
    });

    console.log('Depois do fetch');
    console.log('Dados do novo usuário:', novoUsuario);
}
