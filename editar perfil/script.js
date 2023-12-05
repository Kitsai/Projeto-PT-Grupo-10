document.addEventListener('DOMContentLoaded', async () => {


    const gender = sessionStorage.getItem('gender');
    const jobTitle = sessionStorage.getItem('jobTitle');

    document.getElementById('link_profile_picture').value = sessionStorage.getItem('profile_picture')
    document.getElementById('username').value = sessionStorage.getItem('username');
    document.getElementById('email').value = sessionStorage.getItem('email');

    if (gender) {
        document.getElementById('gender').value = gender;
    }

    if (jobTitle) {
        document.getElementById('jobTitle').value = jobTitle;
    }
});



document.getElementById('botao_editar_cadastro').onclick = editarCadastro;

async function editarCadastro() {
    console.log("botão clicado")

    const userId = sessionStorage.getItem('userId')
    const token = sessionStorage.getItem('token')

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const profile_picture = document.getElementById('link_profile_picture').value;

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
            sessionStorage.setItem('gender', newInfo.gender);
            sessionStorage.setItem('jobTitle', newInfo.jobTitle);
            sessionStorage.setItem('profile_picture', newInfo.profile_picture)

            window.location.href = "../tela de perfil/index.html";
        } else {
            console.error('Erro na edição', response.statusText);

        }
    } catch (error) {
        console.error('Erro na edição', error);
    }

    console.log('Depois do fetch');
    console.log('Dados do usuário atualizado:', newInfo);

}

