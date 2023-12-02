import { mockedPosts } from '../src/Feed_posts.js'
import { currentUser } from '../src/Current_user.js'

export const renderPosts = () => {
    const logado = currentUser != null

    const postContainer = document.querySelector(".posts")

    const linkDados = (!logado) ? "../home/página de login.html" : "perfil"
    const linkPost = "../Comentarios/index.html"
    
    
    mockedPosts.forEach( post => {
        const postCard = document.createElement("div")
        const botao = (logado && post.user.name == currentUser.name)? '<button class="delete_button"><img src="../assets/rubbish-bin-svgrepo-com.svg" alt="deletar"></button>': ''
        postCard.classList.add("card")

        postCard.innerHTML = '<div class="post_header"><a href="' 
        + linkDados + '" class="dados"> <img src="'
        + post.user.img + '" alt="profile picture"> <h2>'
        + post.user.name + '</h2>'
        + post.date + '</a>'
        + botao + '</div><a href="'
        + linkPost + '" class="content">'
        + post.content + '</a>'
        
        postContainer.appendChild(postCard)
    })
}
