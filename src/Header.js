import renderFeed from "../Feed/Render_Feed.js";

export default function renderHeader (page) {

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const profile_picture = sessionStorage.getItem('profile_picture');


    const header = document.body.querySelector("header")

    if(header.querySelector(".header_content") != null) {
        header.removeChild(header.querySelector(".header_content"))
    }

    const header_content = document.createElement("div")
    header_content.id = (token)? "header_logado" : "header_deslogado"
    header_content.classList.add("header_content")

    if(token) {
        header_content.innerHTML = '<a href="../tela de perfil/index.html" class="header_profile"><img src="'
        + profile_picture + '" alt="profile picture"> '
        + username + '</a>'

        const logout = document.createElement("button")
        logout.id = 'exit_button'
        logout.type = 'button'
        logout.innerHTML = '<img src="../assets/log-out.svg" alt="exit">'

        logout.addEventListener("click", exit_button_clicked,false)
        logout.myParam = page

        header_content.appendChild(logout)
    } else {
        header_content.innerHTML = '<a id="header_cadastro" href="../tela de cadastro/página de cadastro.html">Crie uma conta</a>'
        + '<a id="header_entrar" href="../home/página de login.html">ENTRAR</a>'
        
        header_content.addEventListener('click', () => {
            localStorage.setItem("foca@pagina-anterior", window.location.href);
        })
        
    }

    header.appendChild(header_content)
}

const exit_button_clicked = (evt) => {
    const destino = "../Feed/index.html"

    const page = evt.currentTarget.myParam
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('profile_picture');
    switch(page) {
        case "feed":
            renderFeed(null)
            break
        default:
            break
    }
    renderHeader(page)
    if (window.location.href !== destino) {
        window.location.href = destino;
    }
}