function validarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    if (email === "admin" && senha === "admin") {
        window.location.href = "../Feed/index.html";
    } else {
        // Se o login falhar, exiba a mensagem de erro
        mensagemErro.style.display = "block";
    }
}
