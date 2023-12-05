import { mockedComments } from './Comen_posts.js'
import { currentUser } from './Current_user.js'

export const render_Posts_Comen = () => {
    const logado = currentUser != null

    const commentContainer = document.querySelector(".comment")

    const linkDados = (!logado) ? "../home/página de login.html" : "perfil"
    
    
    
    mockedComments.forEach( comment => {
        const commentCard = document.createElement("div")
        const botao = (logado && comment.user.name == currentUser.name)? '<button class="delete_button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button>': ''
        commentCard.classList.add("card")

        commentCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="'
        + comment.user.img + '" alt="profile picture"> <h2>'
        + comment.user.name + '</h2>'
        + comment.date + '</a>'
        + botao + '</div><a href="'
        + linkComment + '" class="content">'
        + comment.content + '</a>'
        
        commentContainer.appendChild(commentCard)
    })
}
