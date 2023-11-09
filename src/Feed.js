import { mockedPosts } from './Feed_posts.js'

const renderPosts = () => {
    const postContainer = document.querySelector(".posts")

    const linkDados = (document.querySelector("#header_deslogado") != null) ? "../home/página de login.html" : "perfil"
    const linkPost = (document.querySelector("#header_deslogado") != null) ? "../home/página de login.html" : "comentarios"
    
    mockedPosts.forEach( post => {
        const postCard = document.createElement("div")
        postCard.classList.add("card")

        postCard.innerHTML = '<a href="' + linkDados + '" class="dados"><img src="' + post.user.img + '" alt="Foto de perfil"><h2> ' + post.user.name + '</h2>' + post.date + '</a> <a href="' + linkPost + '" class="content"><p>' + post.content + '</p></a>'
        
        postContainer.appendChild(postCard)
    })
}

renderPosts()