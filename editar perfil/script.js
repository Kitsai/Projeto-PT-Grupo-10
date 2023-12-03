document.getElementById('botao_editar_cadastro').onclick = editarCadastro;


async function editarCadastro() {
    console.log("botão clicado")

    const userId = sessionStorage.getItem('userId')

    const username = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nome = document.getElementById('nome').value;
    const gender = document.getElementById('genero').value;
    const jobTitle = document.getElementById('cargo').value;
    const profile_picture = ''
    const mensagemErro = document.getElementById("mensagem_erro");

    const newInfo = {
        username,
        email,
        password,
        gender,
        jobTitle,
        profile_picture,
    };

    console.log(newInfo)


    try {
        const response = await fetch(`http://localhost:3000/user/edit-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInfo),
        });

        if (response.ok) {
            console.log('Edição bem-sucedida', newInfo);
            window.location.href = "../tela de perfil/index.html";
        } else {
            console.error('Erro na edição', response.statusText);
            // Exibir mensagem de erro na interface, se necessário
        }
    } catch (error) {
        console.error('Erro na edição', error);
    }

    console.log('Depois do fetch');
    console.log('Dados do usuário atualizado:', newInfo);
}
