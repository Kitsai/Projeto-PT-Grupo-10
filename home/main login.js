async function validarLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("senha").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            const { token } = await response.json();
            console.log('Login bem-sucedido', token);
            // salvarToken(token); // Ainda precisa implementar essa função
            window.location.href = '../Feed/index.html';
        } else {
            mensagemErro.style.display = 'block';
            console.error('Credenciais incorretas');
        }
    } catch (error) {
        console.error('Erro durante o login', error);
    }
}
