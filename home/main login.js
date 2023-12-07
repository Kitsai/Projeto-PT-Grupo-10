async function setData(token) {
    sessionStorage.setItem('token', token);
    const res = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + token, 'Content-Type': 'application/json' },
    });

    if(res.ok) {
        const user = await res.json();

        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('profile_picture', user.profile_picture);
        sessionStorage.setItem('userId', user.id)
        sessionStorage.setItem('jobTitle', user.jobTitle)
        sessionStorage.setItem('gender', user.gender)
        sessionStorage.setItem('email', user.email)

    } else {
        console.error('Erro ao pegar dados do username', res.status, res.statusText);
    }
}


async function validarLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("senha").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    try{
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })


        if(response.ok) {
            const {token} = await response.json();
            console.log('login bem sucedido', token);
            const pagina_anterior = localStorage.getItem("foca@pagina-anterior")
            await setData(token);
            if(pagina_anterior){
                window.location.href = pagina_anterior;

            }else{
                window.location.href = '../Feed/index.html';
            }


        } else {
            mensagemErro.style.display = 'block';
            console.error('credenciais incorretas');
        }

    }
    catch (error) {
        console.error('Erro durante o login', error);
    }
}