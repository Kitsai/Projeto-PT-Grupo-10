// Selecione o elemento da mensagem de erro
const mensagem_erro = document.getElementById("mensagem_erro");

// Adicione um evento de clique ao botão "Entrar"
const botaoEntrar = document.querySelector(".caixa_botao");
botaoEntrar.addEventListener("click", function (event) {
  // Evite o envio do formulário por padrão
  event.preventDefault();

  // Obtenha os valores do email e senha inseridos
  const email = document.querySelector(".caixa_grupo_input input[type='text']").value;
  const senha = document.querySelector(".caixa_grupo_input input[type='password']").value;

  // Verifique se as credenciais são válidas
  if (email === "admin" && senha === "admin") {
    // Credenciais válidas - redirecione para a página de sucesso ou execute a ação necessária
    window.location.href = "https://www.google.com.br/?hl=pt-BR";
  } else {
    // Credenciais inválidas - exiba a mensagem de erro
    mensagem_erro.style.display = "block";
  }
});
