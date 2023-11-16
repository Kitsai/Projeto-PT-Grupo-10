import { mockedPosts } from "../src/Feed_posts.js"
import { currentUser } from "../src/Current_user.js"

const renderPosts = (logado) => {
    const postContainer = document.querySelector(".posts")

    postContainer.innerText = ""

    const linkDados = (!logado) ? "../home/página de login.html" : "perfil"
    const linkPost = (!logado) ? "../home/página de login.html" : "comentarios"
    
    
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

const newPostButtonClicked = () => {

}

export const renderFeed = () => {
    const logado = currentUser != null

    renderPosts(logado)

    if(document.getElementById("new_post_button") != null) {
        document.getElementById("new_post_button").remove()
    }

    if(logado) {
        const newPostButton = document.createElement("button")
        newPostButton.id = "new_post_button"
        newPostButton.type = "button"
        newPostButton.innerText = 'New Post'
        
        newPostButton.addEventListener("click", newPostButtonClicked, false)
        
        document.getElementById("container_header").appendChild(newPostButton)
    }
}