async function validarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    try {
        // Enviar solicitação ao servidor para verificar as credenciais
        const response = await fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password: senha,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login bem-sucedido', data);
            window.location.href = '../Feed/index.html';
        } else {
            mensagemErro.style.display = 'block';
            console.error('Credenciais incorretas');
        }
    } catch (error) {
        console.error('Erro durante o login', error);
    }
}
