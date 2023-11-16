import { currentUser,updateUser } from "./Current_user.js";
import { renderFeed } from "../Feed/Render_Feed.js";

export const renderHeader = (page) => {
    const header = document.body.querySelector("header")
    const logado = currentUser != null

    if(header.querySelector(".header_content") != null) {
        header.removeChild(header.querySelector(".header_content"))
    }

    const header_content = document.createElement("div")
    header_content.id = (logado)? "header_logado" : "header_deslogado"
    header_content.classList.add("header_content")

    if(logado) {
        header_content.innerHTML = '<a href="" class="header_profile"><img src="'
        + currentUser.img + '" alt="profile picture"> '
        + currentUser.name + '</a>'

        const logout = document.createElement("button")
        logout.id = 'exit_button'
        logout.type = 'button'
        logout.innerHTML = '<img src="../assets/exit-14.svg" alt="exit">'

        logout.addEventListener("click", exit_button_clicked,false)
        logout.myParam = page

        header_content.appendChild(logout)
    } else {
        header_content.innerHTML = '<a id="header_cadastro" href="../tela de cadastro/página de cadastro.html">Crie uma conta</a>'
        + '<a id="header_entrar" href="../home/página de login.html">ENTRAR</a>'
    }

    header.appendChild(header_content)
}

const exit_button_clicked = (evt) => {
    const page = evt.currentTarget.myParam
    
    updateUser(null)

    switch(page) {
        case "feed":
            renderFeed()
            break
        default:
            break
    }
    renderHeader(page)
}