document.getElementById('botao_cadastro').onclick = criarCadastro;


async function criarCadastro() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const profile_picture = document.getElementById('link_profile_picture').value;



    const novousername = {
        username,
        email,
        password,
        gender,
        jobTitle,
        profile_picture,
    };

    console.log(novousername)


    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novousername),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cadastro bem-sucedido', data);
        window.location.href = "../home/página de login.html"
    })
    .catch(error => {
        console.error('Erro no cadastro', error);
    });

    console.log('Depois do fetch');
    console.log('Dados do novo usuário:', novousername);
}
