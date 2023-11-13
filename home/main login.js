function validarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    if (email === "admin" && senha === "admin") {
        // Se o login for bem-sucedido, redirecione para a página principal do Google
        window.location.href = "https://www.google.com";
    } else {
        // Se o login falhar, exiba a mensagem de erro
        mensagemErro.style.display = "block";
    }
}
