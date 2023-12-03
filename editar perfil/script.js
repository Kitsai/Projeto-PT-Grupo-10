document.addEventListener('DOMContentLoaded', async () => {


    const gender = sessionStorage.getItem('gender');
    const jobTitle = sessionStorage.getItem('cargo');

    document.getElementById('usuario').value = sessionStorage.getItem('username');
    document.getElementById('email').value = sessionStorage.getItem('email');

    if (gender) {
        document.getElementById('genero').value = gender;
    }

    if (jobTitle) {
        document.getElementById('cargo').value = jobTitle;
    }
});



document.getElementById('botao_editar_cadastro').onclick = editarCadastro;

async function editarCadastro() {
    console.log("botão clicado")

    const userId = sessionStorage.getItem('userId')
    const token = sessionStorage.getItem('token')

    const username = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('genero').value;
    const jobTitle = document.getElementById('cargo').value;
    const profile_picture = ''

    const newInfo = {
        username,
        email,
        gender,
        jobTitle,
        profile_picture,
    };

    console.log(newInfo)


    try {
        const response = await fetch(`http://localhost:3000/user/edit-profile`, {
            method: 'PUT',
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInfo),
        });
        if (response.ok) {
            console.log('Edição bem-sucedida', newInfo);

            sessionStorage.setItem('username', newInfo.username);
            sessionStorage.setItem('email', newInfo.email);
            sessionStorage.setItem('genero', newInfo.gender);
            sessionStorage.setItem('cargo', newInfo.jobTitle);

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

